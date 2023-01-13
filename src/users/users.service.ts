import { UsersRepository } from './users.repository';
import { RequestUserDto } from './dto/users.request.dto';
import { UsersEntity } from './users.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: RequestUserDto): Promise<UsersEntity> {
    const { email, password } = body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.usersRepository.addUser({
      email,
      password: hashedPassword,
    });
  }

  async signIn(body: RequestUserDto): Promise<{ accessToken: string }> {
    const { email, password } = body;
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('No user');
    }

    if (bcrypt.compare(password, user.password)) {
      const payload = { id: user.id };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Login failed');
    }
  }

  async getUserById(id: number): Promise<UsersEntity> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException(`Can't find User with id ${id}`);
    }

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.deleteOneById(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find user with id ${id}`);
    }
  }
}
