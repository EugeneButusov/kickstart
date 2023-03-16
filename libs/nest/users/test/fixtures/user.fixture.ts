import { Role } from '../../src/types/role.enum';

const userFixture = (seed = '1') => {
  return {
    id: `id-${seed}`,
    role: Role.Regular,
    username: `username-${seed}`,
  };
};
