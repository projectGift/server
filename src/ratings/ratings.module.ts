import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { AssessmentsEntity } from './entities/assessments.entity';
import { QuestionnaireEntity } from './entities/questionnaire.entity';
import { ServiceRating } from './entities/questionnaire_results.entity';
import { QuestionsEntity } from './entities/questions.entity';
import { RatingsEntity } from './entities/ratings_entity';
import { ProductRating } from './entities/ratings_products.entity';
import { RatingsController } from './ratings.controller';
import { RatingsRepository } from './ratings.repository';
import { RatingsService } from './ratings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRating,
      ServiceRating,
      AssessmentsEntity,
      QuestionnaireEntity,
      RatingsEntity,
      QuestionsEntity,
      UsersEntity,
    ]),
  ],
  controllers: [RatingsController],
  providers: [RatingsService, RatingsRepository],
})
export class RatingsModule {}
