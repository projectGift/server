import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RelationListEntity } from './relation_lists.entity';

@Entity({ name: 'products_relation_lists' })
export class ProductsRelationListsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products_id: number;

  @Column()
  @ManyToMany(() => RelationListEntity)
  @JoinTable()
  relation_lists_id: number;
}
