import { ObjectIdColumn } from './decorators/object-id-column.decorator';

export class BaseEntity {
  @ObjectIdColumn({ name: '_id' })
  id: string;
}
