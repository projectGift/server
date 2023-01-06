import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class ProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_price: string;

  @Column()
  product_review_count: number;

  @Column()
  product_url: string;

  @Column()
  thumbnail: string;

  @Column()
  product_ratings: number;

  @Column()
  ratings_count: number;
}
