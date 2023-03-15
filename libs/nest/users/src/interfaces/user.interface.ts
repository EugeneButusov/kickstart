import { Entity } from '@libs/nest/common/database/entity.interface';
import { UserRole } from '../types/user-role.enum';

export interface User extends Entity {
  username: string;
  role: UserRole;
  hashedPassword: string;
}
