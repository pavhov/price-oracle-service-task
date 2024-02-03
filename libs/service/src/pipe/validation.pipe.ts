import * as c from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';

import { map, omit } from 'lodash';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import {
  hasSchema,
  validateSchema,
} from '@github.com/pavhov/price-oracle-service-task/service/ajv/ajv.lib';
import { ValidationError } from 'ajv';

@c.Injectable()
export class ValidationPipe implements c.PipeTransform<any> {
  async transform(value: any, metadata: c.ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = omit(
      plainToInstance(metatype, value.data || value),
      'noCache',
    );

    if (hasSchema(metatype.name)) {
      return this.ajvValidate(metatype, object);
    }

    return this.classValidate(metatype, object);
  }

  private toValidate(metatype: c.Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private async classValidate(_metatype: any, object: object) {
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new UnprocessableEntityException(
        map(errors, (value: any) => value),
      );
    }
    return object;
  }

  private async ajvValidate(metatype: { name: string }, object: any) {
    const { data, error } = await validateSchema(metatype.name, object);
    if (error?.errors?.length > 0) {
      throw new UnprocessableEntityException(
        map(error.errors, (value: ValidationError) => value),
      );
    }
    return data;
  }
}
