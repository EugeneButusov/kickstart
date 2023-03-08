import { UserEntity } from '../entities/user.entity';
import { EntityRepository, MongoRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserEntityRepository extends MongoRepository<UserEntity> {}
