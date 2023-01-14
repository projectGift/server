import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductRating } from './ratings_products.entity';

@Entity({ name: 'ratings' })
export class RatingsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ratings: number;

  @OneToMany(() => ProductRating, (productRating) => productRating.rating)
  productRatings: ProductRating[];
}
