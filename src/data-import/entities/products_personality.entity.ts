import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonalityListEntity } from './personality_lists.entity';

@Entity({ name: 'products_personality_lists' })
export class ProductsPersonalityListsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products_id: number;

  @Column()
  @ManyToMany(() => PersonalityListEntity)
  @JoinTable()
  personality_lists_id: number;
}
