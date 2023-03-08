import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { User } from '../interfaces/user.interface';

@Entity('users')
export class UserEntity implements User {
  @ObjectIdColumn()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  _id: string;

  @PrimaryColumn()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  id: string;

  @Column()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  username: string;
}
