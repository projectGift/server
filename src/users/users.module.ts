import { UsersRepository } from './users.repository';
import { UsersEntity } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ProductRating } from 'src/ratings/entities/ratings_products.entity';
import { ServiceRating } from 'src/ratings/entities/questionnaire_results.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, ProductRating, ServiceRating]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRESIN'),
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
