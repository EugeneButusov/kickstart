import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../interfaces/user.interface';

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  id: string;

  @Column()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  username: string;
}
