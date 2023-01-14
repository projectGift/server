import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from 'src/users/entities/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionnaireEntity } from './questionnaire.entity';

@Entity({ name: 'questionnaire_results' })
export class ServiceRating extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 10,
    description: 'userId',
  })
  @Column({ nullable: true })
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'questionnaireId',
  })
  @Column()
  questionnaireId: number;

  @ApiProperty({
    example: '서비스 속도가 조금 더 빨랐으면 좋겠어요!',
    description: 'comment',
  })
  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.serviceRatings)
  user: UsersEntity;

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaireEntity) => questionnaireEntity.serviceRatings,
  )
  questionnaire: QuestionnaireEntity;
}
