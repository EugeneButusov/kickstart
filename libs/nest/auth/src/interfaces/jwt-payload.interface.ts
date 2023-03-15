import { Role } from '@libs/nest/users/types/role.enum';

export interface JwtPayload {
  sub: string;
  username: string;
  role: Role;
}
