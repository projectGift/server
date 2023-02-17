import { Module } from '@nestjs/common';
import { DataImportService } from './data-import.service';
import { DataImportController } from './data-import.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderListEntity } from './entities/gender_lists.entity';
import { EventListEntity } from './entities/event_lists.entity';
import { AgeListEntity } from './entities/age_lists.entity';
import { HobbyListEntity } from './entities/hobby_lists.entity';
import { MbtiListEntity } from './entities/mbti_lists.entity';
import { PersonalityListEntity } from './entities/personality_lists.entity';
import { RelationListEntity } from './entities/relation_lists.entity';
import { SeasonListEntity } from './entities/season_lists.entity';
import { TimeListEntity } from './entities/time_lists.entity';
import { ProductsEntity } from './entities/products.entity';
import { ProductsGenderListsEntity } from './entities/products_gender_lists.entity';
import { ProductsEventListsEntity } from './entities/products_event_lists.entity';
import { ProductsAgeListsEntity } from './entities/products_age_lists.entity';
import { ProductsHobbyListsEntity } from './entities/products_hobby_lists.entity';
import { ProductsMbtiListsEntity } from './entities/products_mbti_lists.entity';
import { ProductsPersonalityListsEntity } from './entities/products_personality.entity';
import { ProductsRelationListsEntity } from './entities/products_relation_lists.entity';
import { ProductsSeasonListsEntity } from './entities/products_season_lists.entity';
import { ProductsTimeListsEntity } from './entities/products_time_lists.entity';
import { Test } from './util';

@Module({
  imports: [
    TypeOrmModule.forFeature([
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
      // Test,
    ]),
  ],
  providers: [DataImportService, Test],
  controllers: [DataImportController],
})
export class DataImportModule {}
