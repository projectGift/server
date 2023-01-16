import { ApiProperty } from '@nestjs/swagger';
import { ProductsEntity } from 'src/data-import/entities/products.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Entity } from 'typeorm';
import { RatingsEntity } from './ratings_entity';

@Entity({ name: 'ratings_products' })
export class ProductRating extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 10,
    description: 'userId',
  })
  @Column({ nullable: true })
  userId: number;

  @ApiProperty({
    example: 180,
    description: 'productId',
  })
  @Column()
  productId: number;

  @ApiProperty({
    example: 4,
    description: 'ratingId',
  })
  @Column()
  ratingId: number;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.productRatings)
  user: UsersEntity;

  @ManyToOne(
    () => ProductsEntity,
    (productsEntity) => productsEntity.productRatings,
  )
  product: ProductsEntity;

  @ManyToOne(
    () => RatingsEntity,
    (ratingsEntity) => ratingsEntity.productRatings,
  )
  rating: RatingsEntity;
}
