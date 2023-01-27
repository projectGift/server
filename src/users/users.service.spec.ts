import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { RatingsRepository } from 'src/ratings/ratings.repository';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);

    // service.signUp({
    //   email: 'hello123@gmail.com',
    //   password: '1234',
    // });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('signIn', () => {
  //   it('should return a access token', () => {
  //     const accessToken = service.signIn({
  //       email: 'hello123@gmail.com',
  //       password: '1234',
  //     });
  //     expect(accessToken).toBeDefined();
  //     // expect(accessToken).toEqual();
  //   });

  //   it('should throw NotFoundException', () => {
  //     try {
  //       service.signIn({
  //         email: 'nouser@gmail.com',
  //         password: '4321',
  //       });
  //     } catch (e) {
  //       expect(e).toBeInstanceOf(NotFoundException);
  //       expect(e.message).toEqual('No user');
  //     }
  //   });

  //   it('should throw UnauthorizedException', () => {
  //     try {
  //       service.signIn({
  //         email: 'hello123@gmail.com',
  //         password: '1111',
  //       });
  //     } catch (e) {
  //       expect(e).toBeInstanceOf(UnauthorizedException);
  //       expect(e.message).toEqual('Login failed');
  //     }
  //   });
  // });
});
