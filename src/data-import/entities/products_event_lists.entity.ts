import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventListEntity } from './event_lists.entity';

@Entity({ name: 'products_event_lists' })
export class ProductsEventListsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products_id: number;

  @Column()
  @ManyToMany(() => EventListEntity)
  @JoinTable()
  event_lists_id: number;
}
