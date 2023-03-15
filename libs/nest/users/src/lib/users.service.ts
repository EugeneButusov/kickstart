import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserParams } from '../interfaces/create-user-params.interface';
import { UserRole } from '@libs/nest/users/types/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  public async create(params: CreateUserParams): Promise<User> {
    const createUserParams: Omit<User, 'id'> = {
      username: params.username,
      role: UserRole.Regular,
      hashedPassword: await bcrypt.hash(
        params.password,
        await bcrypt.genSalt()
      ),
    };
    return this.usersRepository.save(
      this.usersRepository.create(createUserParams)
    );
  }

  public async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneById(id);
  }

  public async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ username });
    if (user) {
      try {
        if (await bcrypt.compare(password, user.hashedPassword)) {
          return user;
        }
      } catch {
        return null;
      }
    }
    return null;
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
