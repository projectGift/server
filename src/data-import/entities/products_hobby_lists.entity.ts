import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HobbyListEntity } from './hobby_lists.entity';

@Entity({ name: 'products_hobby_lists' })
export class ProductsHobbyListsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products_id: number;

  @Column()
  @ManyToMany(() => HobbyListEntity)
  @JoinTable()
  hobby_lists_id: number;
}
