import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionsEntity } from './questions.entity';
import { AssessmentsEntity } from './assessments.entity';
import { ServiceRating } from './questionnaire_results.entity';

@Entity({ name: 'questionnaire' })
export class QuestionnaireEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: number;

  @Column()
  assessmentId: number;

  @OneToMany(
    () => ServiceRating,
    (serviceRating) => serviceRating.questionnaire,
  )
  serviceRatings: ServiceRating[];

  @ManyToOne(
    () => QuestionsEntity,
    (questionsEntity) => questionsEntity.questionnaires,
  )
  question: QuestionsEntity;

  @ManyToOne(
    () => AssessmentsEntity,
    (assessmentsEntity) => assessmentsEntity.questionnaires,
  )
  assessment: AssessmentsEntity;
}
