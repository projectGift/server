import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SuggestDto } from './dto/suggest.dto';

@Injectable()
export class SuggestService {
  constructor(private readonly dataSource: DataSource) {}
  async getSuggestProduct(body: SuggestDto) {
    const {
      gender,
      age,
      mbti,
      personality,
      price,
      relation,
      time,
      hobby,
      season,
      event,
      receiver,
    } = body;

    const labelingData = {
      gender,
      age,
      mbti,
      personality,
      relation,
      time,
      hobby,
      season,
      event,
    };

    const getProductIdFromLabeling = [];

    const numberArray = Object.entries(labelingData).filter(
      (item) => typeof item[1] === 'number',
    );
    const multipleArray = Object.entries(labelingData).filter(
      (item) => typeof item[1] !== 'number',
    );

    multipleArray.map((key: any[]) =>
      key[1].map((value: number[]) => numberArray.push([key[0], value])),
    );

    for (let i = 0; i < numberArray.length; i++) {
      const getDataBaseData: [] = await this.dataSource.query(`
        SELECT 
        products_id
        FROM products_${numberArray[i][0]}_lists
        WHERE ${numberArray[i][0]}_lists_id = ${numberArray[i][1]}
      `);

      const getRows = getDataBaseData.map((item) => item['products_id']);

      getProductIdFromLabeling.push(...getRows);
    }

    const getProductIdByPrice = await this.dataSource.query(`
    SELECT id FROM products WHERE product_price BETWEEN ${price.start} AND ${price.end}
    `);

    const minMaxProductId = getProductIdByPrice.map((item: []) => item['id']);

    const sameIdCount = getProductIdFromLabeling.reduce(
      (ac, v) => ({ ...ac, [v]: (ac[v] || 0) + 1 }),
      {},
    );

    const priceAndCountProductId = Object.entries(sameIdCount)
      .filter((item) => {
        for (let i = 0; i < minMaxProductId.length; i++) {
          if (minMaxProductId[i] == item[0]) return item;
        }
      })
      .sort(([, a]: any, [, b]: any) => b - a);

    let addProductId;

    if (priceAndCountProductId.length < 3) {
      const getProductIdByPrice = await this.dataSource.query(`
    SELECT id FROM products WHERE product_price BETWEEN ${
      price.start - 50000
    } AND ${price.end + 50000}
    `);

      const minMaxProductId = getProductIdByPrice.map((item) => item['id']);

      const sameIdCount = getProductIdFromLabeling.reduce(
        (ac, v) => ({ ...ac, [v]: (ac[v] || 0) + 1 }),
        {},
      );

      const getProductIdAndCounting = Object.entries(sameIdCount)
        .filter((item) => {
          for (let i = 0; i < minMaxProductId.length; i++) {
            if (minMaxProductId[i] == item[0]) return item;
          }
        })
        .sort(([, a]: any, [, b]: any) => b - a);

      addProductId = getProductIdAndCounting
        .filter(
          (el) => !priceAndCountProductId.map((t) => t[0]).includes(el[0]),
        )
        .slice(0, 3 - priceAndCountProductId.length);
    }

    const result = await Promise.all(
      priceAndCountProductId.map(
        async (item) =>
          await this.dataSource.query(
            `SELECT * FROM products WHERE id = ${item[0]}`,
          ),
      ),
    );

    const addProductInfo = await Promise.all(
      addProductId.map(
        async (item: string[]) =>
          await this.dataSource.query(
            `SELECT * FROM products WHERE id = ${item[0]}`,
          ),
      ),
    );

    const addResult = addProductInfo.reduce((acc, value) => [...acc, ...value]);

    const sortResult = result.reduce((acc, value) => [...acc, ...value]);

    const reviewSortResult = sortResult
      .sort((a, b) => b.product_review_count - a.product_review_count)
      .splice(0, 3);

    reviewSortResult.push(...addResult);

    return reviewSortResult;
  }
}
