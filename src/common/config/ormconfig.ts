import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GenderListEntity } from '../../data-import/entities/gender_lists.entity';
import { EventListEntity } from '../../data-import/entities/event_lists.entity';
import { AgeListEntity } from '../../data-import/entities/age_lists.entity';
import { HobbyListEntity } from 'src/data-import/entities/hobby_lists.entity';
import { MbtiListEntity } from 'src/data-import/entities/mbti_lists.entity';
import { PersonalityListEntity } from 'src/data-import/entities/personality_lists.entity';
import { RelationListEntity } from 'src/data-import/entities/relation_lists.entity';
import { SeasonListEntity } from 'src/data-import/entities/season_lists.entity';
import { TimeListEntity } from 'src/data-import/entities/time_lists.entity';
import { ProductsEntity } from '../../data-import/entities/products.entity';
import { ProductsGenderListsEntity } from 'src/data-import/entities/products_gender_lists.entity';
import { ProductsEventListsEntity } from 'src/data-import/entities/products_event_lists.entity';
import { ProductsAgeListsEntity } from 'src/data-import/entities/products_age_lists.entity';
import { ProductsHobbyListsEntity } from 'src/data-import/entities/products_hobby_lists.entity';
import { ProductsMbtiListsEntity } from 'src/data-import/entities/products_mbti_lists.entity';
import { ProductsPersonalityListsEntity } from 'src/data-import/entities/products_personality.entity';
import { ProductsRelationListsEntity } from 'src/data-import/entities/products_relation_lists.entity';
import { ProductsSeasonListsEntity } from 'src/data-import/entities/products_season_lists.entity';
import { ProductsTimeListsEntity } from 'src/data-import/entities/products_time_lists.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { QuestionsEntity } from 'src/ratings/entities/questions.entity';
import { AssessmentsEntity } from 'src/ratings/entities/assessments.entity';
import { QuestionnaireEntity } from 'src/ratings/entities/questionnaire.entity';
import { RatingsEntity } from 'src/ratings/entities/ratings_entity';
import { ServiceRating } from 'src/ratings/entities/questionnaire_results.entity';
import { ProductRating } from 'src/ratings/entities/ratings_products.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    url: configService.get('DATABASE_URL'),
    username: configService.get('DB_USERNAME'),
    host: configService.get('DB_HOST'),
    database: configService.get('DB_NAME'),
    password: configService.get('DB_PASSWORD'),
    entities: [
      GenderListEntity,
      EventListEntity,
      AgeListEntity,
      HobbyListEntity,
      MbtiListEntity,
      PersonalityListEntity,
      RelationListEntity,
      SeasonListEntity,
      TimeListEntity,
      ProductsEntity,
      ProductsGenderListsEntity,
      ProductsEventListsEntity,
      ProductsAgeListsEntity,
      ProductsHobbyListsEntity,
      ProductsMbtiListsEntity,
      ProductsPersonalityListsEntity,
      ProductsRelationListsEntity,
      ProductsSeasonListsEntity,
      ProductsTimeListsEntity,
      UsersEntity,
      QuestionsEntity,
      AssessmentsEntity,
      QuestionnaireEntity,
      RatingsEntity,
      ProductRating,
      ServiceRating,
    ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
  }),
  dataSourceFactory: async (options) => {
    const dataSource = await new DataSource(options).initialize();
    return dataSource;
  },
};
