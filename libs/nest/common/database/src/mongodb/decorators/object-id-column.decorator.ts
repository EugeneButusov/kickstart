import { ObjectId } from 'mongodb';
import {
  ColumnOptions,
  ObjectIdColumn as TypeormObjectColumnId,
} from 'typeorm';
import { MongodbHelper } from '../helpers/mongo.helper';

function from(value?: ObjectId): string | undefined {
  return value?.toString();
}

function to(value?: string | ObjectId): ObjectId | string | undefined {
  return MongodbHelper.toObjectId(value);
}

export function ObjectIdColumn(options?: ColumnOptions): PropertyDecorator {
  return function decorate(object, propertyName: string | symbol) {
    const transformer = { from, to };
    return TypeormObjectColumnId({
      transformer,
      name: propertyName.toString(),
      ...options,
    })(object, propertyName);
  };
}
