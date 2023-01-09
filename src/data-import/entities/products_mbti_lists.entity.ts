import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MbtiListEntity } from './mbti_lists.entity';

@Entity({ name: 'products_mbti_lists' })
export class ProductsMbtiListsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products_id: number;

  @Column()
  @ManyToMany(() => MbtiListEntity)
  @JoinTable()
  mbti_lists_id: number;
}
