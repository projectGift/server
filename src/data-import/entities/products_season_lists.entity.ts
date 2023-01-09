import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SeasonListEntity } from './season_lists.entity';

@Entity({ name: 'products_season_lists' })
export class ProductsSeasonListsEntity extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products_id: number;

  @Column()
  @ManyToMany(() => SeasonListEntity)
  @JoinTable()
  season_lists_id: number;
}
