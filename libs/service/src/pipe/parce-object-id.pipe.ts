import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<string, Types.ObjectId>
{
  transform(value: string): Types.ObjectId {
    try {
      return new Types.ObjectId(Object.values(value).join(''));
    } catch (error) {
      throw new BadRequestException('Invalid ObjectId format');
    }
  }
}
