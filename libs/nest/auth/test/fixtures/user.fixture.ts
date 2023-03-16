import { Role } from '@libs/nest/users/types/role.enum';

export const userFixture = (seed = '1') => ({
  id: `id-${seed}`,
  username: `username-${seed}`,
  hashedPassword: `hashed-password-${seed}`,
  role: Role.Regular,
});
