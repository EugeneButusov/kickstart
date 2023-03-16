import { Entity } from '@libs/nest/common/database/entity.interface';
import { Role } from '../types/role.enum';

export interface User extends Entity {
  username: string;
  role: Role;
  hashedPassword: string;
}
