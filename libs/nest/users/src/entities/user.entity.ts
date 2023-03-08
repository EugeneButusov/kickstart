import { Entity } from 'typeorm';
import { User } from '../interfaces/user.interface';

@Entity('users')
export class UserEntity implements User {}
