import { ObjectIdColumn } from './decorators';

export class BaseEntity {
  @ObjectIdColumn({ name: '_id' })
  id: string;
}
