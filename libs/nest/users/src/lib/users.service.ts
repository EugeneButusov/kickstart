import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  public async create(user: User): Promise<User> {
    const userEntity = this.usersRepository.create(user);
    return this.usersRepository.save(userEntity);
  }

  public async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
}
