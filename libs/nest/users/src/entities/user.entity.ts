import { Column, Entity } from 'typeorm';
import { User } from '../interfaces/user.interface';
import { BaseEntity } from '@libs/nest/common/database/mongodb/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @Column({ unique: true })
  username: string;
}
