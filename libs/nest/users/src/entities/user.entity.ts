import { Column, Entity } from 'typeorm';
import { User } from '../interfaces/user.interface';
import { ObjectIdColumn } from '@libs/nest/common/database/src/decorators/object-id-column.decorator';

@Entity('users')
export class UserEntity implements User {
  @ObjectIdColumn({ name: '_id' })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  id: string;

  @Column({ unique: true })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  username: string;
}
