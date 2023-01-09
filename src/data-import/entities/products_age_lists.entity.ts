import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgeListEntity } from './age_lists.entity';

@Entity({ name: 'products_age_lists' })
export class ProductsAgeListsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products_id: number;

  @Column()
  @ManyToMany(() => AgeListEntity)
  @JoinTable()
  age_lists_id: number;
}
