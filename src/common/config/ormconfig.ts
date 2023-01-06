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

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    url: configService.get('DB_URL'),
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
    ],
    synchronize: false,
  }),
  dataSourceFactory: async (options) => {
    const dataSource = await new DataSource(options).initialize();
    return dataSource;
  },
};
