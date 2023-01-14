import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionnaireEntity } from './questionnaire.entity';

@Entity({ name: 'assessments' })
export class AssessmentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @OneToMany(
    () => QuestionnaireEntity,
    (questionnaireEntity) => questionnaireEntity.assessment,
  )
  questionnaires: QuestionnaireEntity[];
}
