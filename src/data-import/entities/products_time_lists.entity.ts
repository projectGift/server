import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeListEntity } from './time_lists.entity';

@Entity({ name: 'products_time_lists' })
export class ProductsTimeListsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products_id: number;

  @Column()
  @ManyToMany(() => TimeListEntity)
  @JoinTable()
  time_lists_id: number;
}
