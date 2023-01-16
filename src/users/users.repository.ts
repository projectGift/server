import { RequestUserDto } from './dto/users.request.dto';
import { UsersEntity } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async addUser(user: RequestUserDto): Promise<UsersEntity> {
    const createdUser = this.usersRepository.create(user);

    try {
      await this.usersRepository.save(createdUser);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Existing email');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return createdUser;
  }

  async findOneByEmail(email: string): Promise<UsersEntity> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<UsersEntity> {
    return await this.usersRepository.findOneBy({ id });
  }

  async deleteOneById(id: number) {
    return await this.usersRepository.delete(id);
  }
}
