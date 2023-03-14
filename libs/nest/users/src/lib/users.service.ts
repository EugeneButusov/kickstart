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

  public async create(user: Omit<User, 'id'>): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(user));
  }

  public async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneById(id);
  }

  public async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  // TODO: support filters & pagination
  public async find(): Promise<User[]> {
    return this.usersRepository.findBy({});
  }

  public async updateById(
    id: string,
    update: Partial<Omit<User, 'id'>>
  ): Promise<boolean> {
    const result = await this.usersRepository.update(id, update);
    return result.affected !== 0;
  }

  public async deleteById(id: string): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected !== 0;
  }
}
