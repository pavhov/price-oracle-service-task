import { AnySchema } from 'ajv';
import { applyDecorators } from '@nestjs/common';

import { ajvLib } from '@github.com/pavhov/price-oracle-service-task/service/ajv/ajv.lib';

export namespace ajv {
  export const Schema = (schema: AnySchema) => {
    return applyDecorators((target: any) => {
      const sSchema: AnySchema = {
        $id: target.name,
        $async: true,
        ...(schema as any),
      };
      ajvLib.addSchema(sSchema, target.name);
    });
  };
}
