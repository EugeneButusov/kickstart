import { Entity } from '@libs/nest/common/database/entity.interface';

export interface User extends Entity {
  username: string;
}
