import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
import { InjectRepository } from '@nestjs/typeorm';
import * as og from 'open-graph';

@Injectable()
export class DataImportService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}
  async importCsvDataInDatabase(file) {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });

    const labelingSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[labelingSheetName];

    const productSheetName = workbook.SheetNames[3];
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
        .select(['gender_lists.id'])
        .getMany();

      const eventResult = await this.dataSource
        .createQueryBuilder(EventListEntity, 'event_lists')
        .select(['event_lists.id'])
        .getMany();

      const ageResult = await this.dataSource
        .createQueryBuilder(AgeListEntity, 'age_lists')
        .select(['age_lists.id'])
        .getMany();

      const mbtiResult = await this.dataSource
        .createQueryBuilder(MbtiListEntity, 'mbti_lists')
        .select(['mbti_lists.id'])
        .getMany();

      const personalityResult = await this.dataSource
        .createQueryBuilder(PersonalityListEntity, 'personality_lists')
        .select(['personality_lists.id'])
        .getMany();

      const relationResult = await this.dataSource
        .createQueryBuilder(RelationListEntity, 'relation_lists')
        .select(['relation_lists.id'])
        .getMany();

      const timeResult = await this.dataSource
        .createQueryBuilder(TimeListEntity, 'time_lists')
        .select(['time_lists.id'])
        .getMany();

      const hobbyResult = await this.dataSource
        .createQueryBuilder(HobbyListEntity, 'hobby_lists')
        .select(['hobby_lists.id'])
        .getMany();

      const seasonResult = await this.dataSource
        .createQueryBuilder(SeasonListEntity, 'season_lists')
        .select(['season_lists.id'])
        .getMany();

      const productResult = await this.dataSource
        .createQueryBuilder(ProductsEntity, 'products')
        .select(['products.id'])
        .getMany();

      const productGenderListResult = await this.dataSource
        .createQueryBuilder(ProductsGenderListsEntity, 'products_gender_lists')
        .select(['products_gender_lists.id'])
        .getMany();

      const productEventListResult = await this.dataSource
        .createQueryBuilder(ProductsEventListsEntity, 'products_event_lists')
        .select(['products_event_lists.id'])
        .getMany();

      const productAgeListResult = await this.dataSource
        .createQueryBuilder(ProductsAgeListsEntity, 'products_age_lists')
        .select(['products_age_lists.id'])
        .getMany();

      const productHobbyListResult = await this.dataSource
        .createQueryBuilder(ProductsHobbyListsEntity, 'products_hobby_lists')
        .select(['products_hobby_lists.id'])
        .getMany();

      const productMbtiListResult = await this.dataSource
        .createQueryBuilder(ProductsMbtiListsEntity, 'products_mbti_lists')
        .select(['products_mbti_lists.id'])
        .getMany();

      const productPersonalityListResult = await this.dataSource
        .createQueryBuilder(
          ProductsPersonalityListsEntity,
          'products_personality_lists',
        )
        .select(['products_personality_lists.id'])
        .getMany();

      const productRelationListResult = await this.dataSource
        .createQueryBuilder(
          ProductsRelationListsEntity,
          'products_relation_lists',
        )
        .select(['products_relation_lists.id'])
        .getMany();

      const productSeasonListResult = await this.dataSource
        .createQueryBuilder(ProductsSeasonListsEntity, 'products_season_lists')
        .select(['products_season_lists.id'])
        .getMany();

      const productTimeListResult = await this.dataSource
        .createQueryBuilder(ProductsTimeListsEntity, 'products_time_lists')
        .select(['products_time_lists.id'])
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
      const productsResultLength = productResult.length;
      const productGenderListResultLength = productGenderListResult.length;
      const productEventListResultLength = productEventListResult.length;
      const productAgeListResultLength = productAgeListResult.length;
      const productHobbyListResultLength = productHobbyListResult.length;
      const productMbtiListResultLength = productMbtiListResult.length;
      const productPersonalityListResultLength =
        productPersonalityListResult.length;
      const productRelationListResultLength = productRelationListResult.length;
      const productSeasonListResultLength = productSeasonListResult.length;
      const productTimeListResultLength = productTimeListResult.length;

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

      if (productsResultLength > 0) {
        for (const row of productsRows) {
          if (row['product_name'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM products WHERE product_name = '${row['product_name']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE products SET product_name = '${row['product_name']}' where id = ${id[0].id}`,
            );
          }

          if (row['product_price'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM products WHERE product_price = '${row['product_price']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE products SET product_price = '${row['product_price']}' where id = ${id[0].id}`,
            );
          }

          if (row['product_review_count'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM products WHERE product_review_count = '${row['product_review_count']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE products SET product_review_count = '${row['product_review_count']}' where id = ${id[0].id}`,
            );
          }

          if (row['product_url'] != null) {
            const id = await this.dataSource.query(
              `SELECT id FROM products WHERE product_url = '${row['product_url']}' LIMIT 1 `,
            );
            await this.dataSource.query(
              `UPDATE products SET product_url = '${row['product_url']}' where id = ${id[0].id}`,
            );
          }
        }
      } else {
        for (const row of productsRows) {
          if (row['product_name'] != null) {
            await this.dataSource.query(
              `INSERT INTO products (product_name, product_price, product_review_count, product_url) VALUES (?, ?, ?, ?)`,
              [
                row['product_name'],
                row['product_price'],
                row['product_review_count'],
                row['product_url'],
              ],
            );
          }
        }
      }

      if (productGenderListResultLength > 0) {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );

          if (row['gender'] != null) {
            const arrayGenderList = row['gender'].split(',');
            await arrayGenderList.map((element) =>
              this.dataSource.query(
                `UPDATE products_gender_lists SET gender_lists_id = ${element} WHERE products_id = ${productId[0].id} `,
              ),
            );
          }
        }
      } else {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );
          if (row['gender'] != null) {
            const arrayGenderList = row['gender'].split(',');

            await arrayGenderList.map((element) =>
              this.dataSource.query(
                `INSERT INTO products_gender_lists (products_id, gender_lists_id) VALUE (?, ?)`,
                [productId[0].id, element],
              ),
            );
          }
        }
      }

      if (productEventListResultLength > 0) {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );

          if (row['event'] != null) {
            const arrayEventList = row['event'].split(',');

            await arrayEventList.map((element) =>
              this.dataSource.query(
                `UPDATE products_event_lists SET event_lists_id = ${element} WHERE products_id = ${productId[0].id} `,
              ),
            );
          }
        }
      } else {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );
          if (row['event'] != null) {
            const arrayEventList = row['event'].split(',');

            await arrayEventList.map((element) =>
              this.dataSource.query(
                `INSERT INTO products_event_lists (products_id, event_lists_id) VALUE (?, ?)`,
                [productId[0].id, element],
              ),
            );
          }
        }
      }

      if (productAgeListResultLength > 0) {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );

          if (row['age'] != null) {
            const arrayAgeList = row['age'].split(',');

            await arrayAgeList.map((element) =>
              this.dataSource.query(
                `UPDATE products_age_lists SET age_lists_id = ${element} WHERE products_id = ${productId[0].id} `,
              ),
            );
          }
        }
      } else {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );
          if (row['age'] != null) {
            const arrayAgeList = row['age'].split(',');

            await arrayAgeList.map((element) =>
              this.dataSource.query(
                `INSERT INTO products_age_lists (products_id, age_lists_id) VALUE (?, ?)`,
                [productId[0].id, element],
              ),
            );
          }
        }
      }

      if (productHobbyListResultLength > 0) {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );

          if (row['hobby'] != null) {
            const arrayHobbyList = String(row['hobby']).split(',');

            await arrayHobbyList.map((element) =>
              this.dataSource.query(
                `UPDATE products_hobby_lists SET hobby_lists_id = ${element} WHERE products_id = ${productId[0].id} `,
              ),
            );
          }
        }
      } else {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );
          if (row['hobby'] != null) {
            const arrayHobbyList = String(row['hobby']).split(',');

            await arrayHobbyList.map((element) =>
              this.dataSource.query(
                `INSERT INTO products_hobby_lists (products_id, hobby_lists_id) VALUE (?, ?)`,
                [productId[0].id, element],
              ),
            );
          }
        }
      }

      if (productMbtiListResultLength > 0) {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );

          if (row['mbti'] != null) {
            const arrayMbtiList = row['mbti'].split(',');
            await arrayMbtiList.map((element) =>
              this.dataSource.query(
                `UPDATE products_mbti_lists SET mbti_lists_id = ${element} WHERE products_id = ${productId[0].id} `,
              ),
            );
          }
        }
      } else {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );
          if (row['mbti'] != null) {
            const arrayMbtiList = row['mbti'].split(',');
            await arrayMbtiList.map((element) =>
              this.dataSource.query(
                `INSERT INTO products_mbti_lists (products_id, mbti_lists_id) VALUE (?, ?)`,
                [productId[0].id, element],
              ),
            );
          }
        }
      }

      if (productPersonalityListResultLength > 0) {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );

          if (row['personality'] != null) {
            const arrayPersonalityList = row['personality'].split(',');

            await arrayPersonalityList.map((element) =>
              this.dataSource.query(
                `UPDATE products_personality_lists SET personality_lists_id = ${element} WHERE products_id = ${productId[0].id} `,
              ),
            );
          }
        }
      } else {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );
          if (row['personality'] != null) {
            const arrayPersonalityList = row['personality'].split(',');

            await arrayPersonalityList.map((element) =>
              this.dataSource.query(
                `INSERT INTO products_personality_lists (products_id, personality_lists_id) VALUE (?, ?)`,
                [productId[0].id, element],
              ),
            );
          }
        }
      }

      if (productRelationListResultLength > 0) {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );

          if (row['relation'] != null) {
            const arrayRelationList = row['relation'].split(',');

            await arrayRelationList.map((element) =>
              this.dataSource.query(
                `UPDATE products_relation_lists SET relation_lists_id = ${element} WHERE products_id = ${productId[0].id} `,
              ),
            );
          }
        }
      } else {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );
          if (row['relation'] != null) {
            const arrayRelationList = row['relation'].split(',');

            await arrayRelationList.map((element) =>
              this.dataSource.query(
                `INSERT INTO products_relation_lists (products_id, relation_lists_id) VALUE (?, ?)`,
                [productId[0].id, element],
              ),
            );
          }
        }
      }

      if (productSeasonListResultLength > 0) {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );

          if (row['season'] != null) {
            const arraySeasonList = row['season'].split(',');

            await arraySeasonList.map((element) =>
              this.dataSource.query(
                `UPDATE products_season_lists SET season_lists_id = ${element} WHERE products_id = ${productId[0].id} `,
              ),
            );
          }
        }
      } else {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );
          if (row['season'] != null) {
            const arraySeasonList = row['season'].split(',');

            await arraySeasonList.map((element) =>
              this.dataSource.query(
                `INSERT INTO products_season_lists (products_id, season_lists_id) VALUE (?, ?)`,
                [productId[0].id, element],
              ),
            );
          }
        }
      }

      if (productTimeListResultLength > 0) {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );

          if (row['time'] != null) {
            const arrayTimeList = row['time'].split(',');

            await arrayTimeList.map((element) =>
              this.dataSource.query(
                `UPDATE products_time_lists SET time_lists_id = ${element} WHERE products_id = ${productId[0].id} `,
              ),
            );
          }
        }
      } else {
        for (const row of productsRows) {
          const productId = await this.dataSource.query(
            `SELECT id FROM products WHERE product_name = '${row['product_name']}'`,
          );
          if (row['time'] != null) {
            const arrayTimeList = row['time'].split(',');

            await arrayTimeList.map((element) =>
              this.dataSource.query(
                `INSERT INTO products_time_lists (products_id, time_lists_id) VALUE (?, ?)`,
                [productId[0].id, element],
              ),
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

      console.error(error);
    }
  }

  async getOgImage() {
    const allProductIdAndUrl = await this.dataSource.query(
      `SELECT id, product_url FROM products`,
    );

    for (let i = 0; i < allProductIdAndUrl.length; i++) {
      og(allProductIdAndUrl[i].product_url, (err, meta) => {
        this.dataSource.query(
          `UPDATE products SET thumbnail = '${meta.image.url}' WHERE id = ${allProductIdAndUrl[i].id}`,
        );
      });
    }
  }
}
