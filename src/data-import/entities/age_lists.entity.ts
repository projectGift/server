import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsAgeListsEntity } from './products_age_lists.entity';

@Entity({ name: 'age_lists' })
export class AgeListEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  @OneToMany(
    () => ProductsAgeListsEntity,
    (productAge) => productAge.age_lists_id,
  )
  id: number;

  @Column()
  name: string;
}
