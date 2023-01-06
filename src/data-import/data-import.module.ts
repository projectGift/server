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
    ]),
  ],
  providers: [DataImportService],
  controllers: [DataImportController],
})
export class DataImportModule {}
