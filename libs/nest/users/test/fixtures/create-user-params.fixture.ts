import { CreateUserParams } from '../../src/interfaces/create-user-params.interface';

export const createUserParamsFixture = (seed = '0'): CreateUserParams => ({
  username: `testuser-${seed}`,
  password: `testpassword-${seed}`,
});
