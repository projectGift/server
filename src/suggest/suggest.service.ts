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

    let reviewSortResult = [];

    switch (priceAndCountProductId.length) {
      case 0: {
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

        const addProductId = getProductIdAndCounting
          .filter(
            (el) => !priceAndCountProductId.map((t) => t[0]).includes(el[0]),
          )
          .slice(0, 3 - priceAndCountProductId.length);

        const addProductInfo = await Promise.all(
          addProductId.map(
            async (item) =>
              await this.dataSource.query(
                `SELECT * FROM products WHERE id = ${item[0]}`,
              ),
          ),
        );

        const addResult = addProductInfo.reduce((acc, value) => [
          ...acc,
          ...value,
        ]);

        reviewSortResult = addResult
          .sort((a, b) => b.product_review_count - a.product_review_count)
          .splice(0, 3);

        break;
      }
      case 1:
      case 2: {
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

        const addProductId = getProductIdAndCounting
          .filter(
            (el) => !priceAndCountProductId.map((t) => t[0]).includes(el[0]),
          )
          .slice(0, 3 - priceAndCountProductId.length);

        const addProductInfo = await Promise.all(
          addProductId.map(
            async (item) =>
              await this.dataSource.query(
                `SELECT * FROM products WHERE id = ${item[0]}`,
              ),
          ),
        );

        const result = await Promise.all(
          priceAndCountProductId.map(
            async (item) =>
              await this.dataSource.query(
                `SELECT * FROM products WHERE id = ${item[0]}`,
              ),
          ),
        );

        const sortResult = result.reduce((acc, value) => [...acc, ...value]);

        const addResult = addProductInfo.reduce((acc, value) => [
          ...acc,
          ...value,
        ]);

        reviewSortResult = sortResult
          .sort((a, b) => b.product_review_count - a.product_review_count)
          .splice(0, 3);

        reviewSortResult.push(...addResult);

        break;
      }
      default: {
        const result = await Promise.all(
          priceAndCountProductId.map(
            async (item) =>
              await this.dataSource.query(
                `SELECT * FROM products WHERE id = ${item[0]}`,
              ),
          ),
        );

        const sortResult = result.reduce((acc, value) => [...acc, ...value]);

        reviewSortResult = sortResult
          .sort((a, b) => b.product_review_count - a.product_review_count)
          .splice(0, 3);

        return reviewSortResult;
      }
    }

    return reviewSortResult;
  }

  async getAllProductCounting() {
    const allProductCounting = await this.dataSource.query(
      `SELECT id FROM products`,
    );
    return allProductCounting.length;
  }
}
