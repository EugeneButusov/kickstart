import { ObjectIdColumn } from './decorators/object-id-column.decorator';
import { Entity } from '../entity.interface';

export class BaseEntity implements Entity {
  @ObjectIdColumn({ name: '_id' })
  id: string;
}
