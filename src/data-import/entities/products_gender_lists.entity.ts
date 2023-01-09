import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenderListEntity } from './gender_lists.entity';

@Entity({ name: 'products_gender_lists' })
export class ProductsGenderListsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products_id: number;

  @Column()
  @ManyToMany(() => GenderListEntity)
  @JoinTable()
  gender_lists_id: number;
}
