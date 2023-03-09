import { Entity } from '@libs/nest/common/database/entity.interface';

export interface User extends Entity {
  id: string;
  username: string;
}
