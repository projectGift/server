import { ProductRating } from 'src/ratings/entities/ratings_products.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
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

  @OneToMany(() => ProductRating, (productRating) => productRating.product)
  productRatings: ProductRating[];
}
