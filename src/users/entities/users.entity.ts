import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProductRating } from 'src/ratings/entities/ratings_products.entity';
import { ServiceRating } from 'src/ratings/entities/questionnaire_results.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class UsersEntity extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'eunsong@gmail.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Column()
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ nullable: true })
  kakaoId: number;

  @Column({ nullable: true })
  googleId: number;

  @OneToMany(() => ProductRating, (productRating) => productRating.user)
  productRatings: ProductRating[];

  @OneToMany(() => ServiceRating, (serviceRating) => serviceRating.user)
  serviceRatings: ServiceRating[];
}
