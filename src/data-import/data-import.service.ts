import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as xlsx from 'xlsx';
import { AgeListEntity } from './entities/age_lists.entity';
import { EventListEntity } from './entities/event_lists.entity';
import { GenderListEntity } from './entities/gender_lists.entity';
import { HobbyListEntity } from './entities/hobby_lists.entity';
import { MbtiListEntity } from './entities/mbti_lists.entity';
import { PersonalityListEntity } from './entities/personality_lists.entity';
import { RelationListEntity } from './entities/relation_lists.entity';
import { SeasonListEntity } from './entities/season_lists.entity';
import { TimeListEntity } from './entities/time_lists.entity';

@Injectable()
export class DataImportService {
  constructor(private readonly dataSource: DataSource) {}
  async importCsvDataInDatabase(file) {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });

    const LabelingSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[LabelingSheetName];

    const productSheetName = workbook.SheetNames[1];
    const productSheet = workbook.Sheets[productSheetName];

    const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });
    const productsRows = xlsx.utils.sheet_to_json(productSheet, {
      defval: null,
    });

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const genderResult = await this.dataSource
        .createQueryBuilder(GenderListEntity, 'gender_lists')
        .select(['gender_lists.id', 'gender_lists.name'])
        .getMany();

      const eventResult = await this.dataSource
        .createQueryBuilder(EventListEntity, 'event_lists')
        .select(['event_lists.id', 'event_lists.name'])
        .getMany();

      const ageResult = await this.dataSource
        .createQueryBuilder(AgeListEntity, 'age_lists')
        .select(['age_lists.id', 'age_lists.name'])
        .getMany();

      const mbtiResult = await this.dataSource
        .createQueryBuilder(MbtiListEntity, 'mbti_lists')
        .select(['mbti_lists.id', 'mbti_lists.name'])
        .getMany();

      const personalityResult = await this.dataSource
        .createQueryBuilder(PersonalityListEntity, 'personality_lists')
        .select(['personality_lists.id', 'personality_lists.name'])
        .getMany();

      const relationResult = await this.dataSource
        .createQueryBuilder(RelationListEntity, 'relation_lists')
        .select(['relation_lists.id', 'relation_lists.name'])
        .getMany();

      const timeResult = await this.dataSource
        .createQueryBuilder(TimeListEntity, 'time_lists')
        .select(['time_lists.id', 'time_lists.name'])
        .getMany();

      const hobbyResult = await this.dataSource
        .createQueryBuilder(HobbyListEntity, 'hobby_lists')
        .select(['hobby_lists.id', 'hobby_lists.name'])
        .getMany();

      const seasonResult = await this.dataSource
        .createQueryBuilder(SeasonListEntity, 'season_lists')
        .select(['season_lists.id', 'season_lists.name'])
        .getMany();

      const genderResultLength = genderResult.length;
      const eventResultLength = eventResult.length;
      const ageResultLength = ageResult.length;
      const mbtiResultLength = mbtiResult.length;
      const personalityResultLength = personalityResult.length;
      const relationResultLength = relationResult.length;
      const timeResultLength = timeResult.length;
      const hobbyResultLength = hobbyResult.length;
      const seasonResultLength = seasonResult.length;

      if (genderResultLength > 0) {
        for (const row of rows) {
          if (row['gender'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM gender_lists WHERE name = '${row['gender']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE gender_lists SET name = '${row['gender']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of rows) {
          if (row['gender'] != null) {
            this.dataSource.query(
              `INSERT INTO gender_lists (name) VALUES (?)`,
              [row['gender']],
            );
          }
        }
      }

      if (eventResultLength > 0) {
        for (const row of rows) {
          if (row['event'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM event_lists WHERE name = '${row['event']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE event_lists SET name = '${row['event']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of rows) {
          if (row['event'] != null) {
            this.dataSource.query(`INSERT INTO event_lists (name) VALUES (?)`, [
              row['event'],
            ]);
          }
        }
      }

      if (ageResultLength > 0) {
        for (const row of rows) {
          if (row['age'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM age_lists WHERE name = '${row['age']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE age_lists SET name = '${row['age']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of rows) {
          if (row['age'] != null) {
            this.dataSource.query(`INSERT INTO age_lists (name) VALUES (?)`, [
              row['age'],
            ]);
          }
        }
      }

      if (mbtiResultLength > 0) {
        for (const row of rows) {
          if (row['mbti'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM mbti_lists WHERE name = '${row['mbti']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE mbti_lists SET name = '${row['mbti']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of rows) {
          if (row['mbti'] != null) {
            this.dataSource.query(`INSERT INTO mbti_lists (name) VALUES (?)`, [
              row['mbti'],
            ]);
          }
        }
      }

      if (personalityResultLength > 0) {
        for (const row of rows) {
          if (row['personality'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM personality_lists WHERE name = '${row['personality']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE personality_lists SET name = '${row['personality']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of rows) {
          if (row['personality'] != null) {
            this.dataSource.query(
              `INSERT INTO personality_lists (name) VALUES (?)`,
              [row['personality']],
            );
          }
        }
      }

      if (relationResultLength > 0) {
        for (const row of rows) {
          if (row['relation'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM relation_lists WHERE name = '${row['relation']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE relation_lists SET name = '${row['relation']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of rows) {
          if (row['relation'] != null) {
            this.dataSource.query(
              `INSERT INTO relation_lists (name) VALUES (?)`,
              [row['relation']],
            );
          }
        }
      }

      if (timeResultLength > 0) {
        for (const row of rows) {
          if (row['time'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM time_lists WHERE name = '${row['time']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE time_lists SET name = '${row['time']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of rows) {
          if (row['time'] != null) {
            this.dataSource.query(`INSERT INTO time_lists (name) VALUES (?)`, [
              row['time'],
            ]);
          }
        }
      }

      if (hobbyResultLength > 0) {
        for (const row of rows) {
          if (row['hobby'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM hobby_lists WHERE name = '${row['hobby']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE hobby_lists SET name = '${row['hobby']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of rows) {
          if (row['hobby'] != null) {
            this.dataSource.query(`INSERT INTO hobby_lists (name) VALUES (?)`, [
              row['hobby'],
            ]);
          }
        }
      }

      if (seasonResultLength > 0) {
        for (const row of rows) {
          if (row['season'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM season_lists WHERE name = '${row['season']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE season_lists SET name = '${row['season']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of rows) {
          if (row['season'] != null) {
            this.dataSource.query(
              `INSERT INTO season_lists (name) VALUES (?)`,
              [row['season']],
            );
          }
        }
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return 'DATA_IMPORT_COMPLETE';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      console.log(error);
    }
  }
}
