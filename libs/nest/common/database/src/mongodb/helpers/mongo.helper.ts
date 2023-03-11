import * as _ from 'lodash';
import { ObjectId } from 'mongodb';

export class MongodbHelper {
  static isValidObjectId(value: ConstructorParameters<typeof ObjectId>[0]) {
    if (typeof value === 'undefined') {
      return false;
    }
    return ObjectId.isValid(value);
  }

  static toObjectId<
    T extends ConstructorParameters<typeof ObjectId>[0] | null | undefined
  >(value: T): ObjectId | T {
    if (_.isNil(value) || !this.isValidObjectId(value)) {
      return value;
    }
    return new ObjectId(value);
  }
}
