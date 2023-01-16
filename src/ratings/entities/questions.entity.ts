import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionnaireEntity } from './questionnaire.entity';

@Entity({ name: 'questions' })
export class QuestionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @OneToMany(
    () => QuestionnaireEntity,
    (questionnaireEntity) => questionnaireEntity.question,
  )
  questionnaires: QuestionnaireEntity[];
}
