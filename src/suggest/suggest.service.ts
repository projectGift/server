import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SuggestDto } from './dto/suggest.dto';

@Injectable()
export class SuggestService {
  constructor(private readonly dataSource: DataSource) {}

  async getSuggestProduct(body: SuggestDto) {
    const labelingData = {
      gender: body.gender,
      age: body.age,
      mbti: body.mbti,
      personality: body.personality,
      relation: body.relation,
      time: body.time,
      hobby: body.hobby,
      season: body.season,
      event: body.event,
    };

    const priceSortProductId = await this.dataSource.query(`
      SELECT id FROM products WHERE product_price BETWEEN ${body.price.start} AND ${body.price.end}
    `);

    let productId = Object.values(priceSortProductId).map((item) => item['id']);

    const getTableNameRabeling = Object.entries(labelingData).filter(
      (item) => typeof item[1] === 'number',
    );

    const getMultiLabeling = Object.entries(labelingData).filter(
      (item) => typeof item[1] !== 'number',
    );

    getMultiLabeling.map((key: any[]) =>
      key[1].map((item) => getTableNameRabeling.push([key[0], item])),
    );

    // 크리티컬하다고 생각되는 부분은 미리 상품군에서 제외하는 로직
    for (const x of getTableNameRabeling) {
      // 둘 다를 선택하면 상관없는 것이기 때문에 전체 상품이 나와야하기 때문에 라벨링을 전체 다 달아줬음
      // 남자를 선택하면 남자가 포함된 상품만 나와야한다 (여자 라벨링 되어있는 상품 제외)
      // 여자를 선택하면 여자가 포함된 상품만 나와야한다 (남자 라벨링 되어있는 상품 제외)
      if (x[0] === 'gender') {
        const listData = await this.dataSource.query(`
      SELECT products_id FROM products_${x[0]}_lists WHERE ${x[0]}_lists_id = ${x[1]}
      `);

        const productIdList: number[] = listData.map(
          (item) => item['products_id'],
        );

        const filtering = productIdList.filter(
          (item) => productId.indexOf(item) !== -1,
        );

        productId = filtering;
      }

      // age에서 반려동물이 나왔을 때는 반려동물 상품만 남기고 나머지를 다 자른다
      if (x[0] === 'age' && x[1] === 2) {
        const listData = await this.dataSource.query(`
      SELECT products_id FROM products_${x[0]}_lists WHERE ${x[0]}_lists_id = ${x[1]}
      `);

        const productIdList: number[] = listData.map(
          (item) => item['products_id'],
        );

        const filtering = productIdList.filter(
          (item) => productId.indexOf(item) !== -1,
        );

        productId = filtering;
      }

      // age에서 아기가 나왔을 때는 아기 상품만 남기고 나머지를 다 자른다
      if (x[0] === 'age' && x[1] === 3) {
        const listData = await this.dataSource.query(`
      SELECT products_id FROM products_${x[0]}_lists WHERE ${x[0]}_lists_id = ${x[1]}
      `);

        const productIdList: number[] = listData.map(
          (item) => item['products_id'],
        );

        const filtering = productIdList.filter(
          (item) => productId.indexOf(item) !== -1,
        );

        if (filtering.length > 3) {
          productId = filtering;
        }
        // filtering 데이터가 3개가 안 될 경우 가격범위를 넓혀서 새로운 상품군을 만든다.
        if (filtering.length < 3) {
          const priceSortProductId = await this.dataSource.query(`
      SELECT id FROM products WHERE product_price BETWEEN ${
        body.price.start - 50000
      } AND ${body.price.end + 50000}
    `);

          const addPriceProductId = Object.values(priceSortProductId).map(
            (item) => item['id'],
          );

          const listData = await this.dataSource.query(`
    SELECT products_id FROM products_${x[0]}_lists WHERE ${x[0]}_lists_id = ${x[1]}
    `);

          const productIdList: number[] = listData.map(
            (item) => item['products_id'],
          );

          const filtering = productIdList.filter(
            (item) => addPriceProductId.indexOf(item) !== -1,
          );

          productId = filtering;
        }
      }
    }

    const getProductIdFromLabeling = [];

    for (let i = 0; i < getTableNameRabeling.length; i++) {
      const getDataBaseData: [] = await this.dataSource.query(`
        SELECT 
        products_id
        FROM products_${getTableNameRabeling[i][0]}_lists
        WHERE ${getTableNameRabeling[i][0]}_lists_id = ${getTableNameRabeling[i][1]}
      `);

      const getRows = getDataBaseData.map((item) => item['products_id']);

      getProductIdFromLabeling.push(...getRows);
    }

    const sameIdCount = getProductIdFromLabeling.reduce(
      (ac, v) => ({ ...ac, [v]: (ac[v] || 0) + 1 }),
      {},
    );

    const priceAndCountProductId = Object.entries(sameIdCount)
      .filter((item) => {
        for (let i = 0; i < productId.length; i++) {
          if (productId[i] == item[0]) return item;
        }
      })
      .sort(([, a]: any, [, b]: any) => b - a);

    const mostSimilarProducts = [];

    // 두 번만 돌리고 끝내고 싶어서 for문 밖에서 count를 2로 선언해줌
    let count = 2;

    // 현재 요소와 다음 요소를 비교했을 때, false를 반환한 시점에서 잘라서 외부의 배열에 push
    // 해당 로직을 2번 반복하여 1,2번째로 많이 카운팅 된 상품군 반환 가능
    for (let i = 0; i < priceAndCountProductId.length - 1; i++) {
      if (count === 0) break;

      if (priceAndCountProductId[i][1] !== priceAndCountProductId[i + 1][1]) {
        const cut = priceAndCountProductId.splice(0, i + 1);
        mostSimilarProducts.push(...cut);
        count -= 1;
      }
    }

    // 반환 받은 상품군들의 정보를 query를 날려서 받는다
    const getProductInfo = await Promise.all(
      mostSimilarProducts.map(
        async (item) =>
          await this.dataSource.query(`
      SELECT * FROM products WHERE id = ${item[0]}
    `),
      ),
    );

    // 이중배열 해제
    const reviewSortProductInfo = getProductInfo.reduce((acc, value) => [
      ...acc,
      ...value,
    ]);

    // 반환받은 상품들의 길이에 맞게 랜덤한 값 산출
    const suggestMinLength = Math.ceil(0);
    const suggestMaxLength = Math.floor(reviewSortProductInfo.length) - 1;

    const randomProductResult = [];

    // 랜덤하게 결과값에 push
    for (let i = 0; i < 3; i++) {
      const randomInteger =
        Math.floor(Math.random() * (suggestMaxLength - suggestMinLength + 1)) +
        suggestMinLength;
      randomProductResult.push(reviewSortProductInfo[randomInteger]);
    }

    // 반복문을 3번 돌렸기 때문에 3개의 상품이 들어와있고, 그 상품들을 review순으로 돌려서 1,2,3순위를 결정하여 반환
    return randomProductResult.sort(
      (a, b) => b.product_review_count - a.product_review_count,
    );
  }

  async getAllProductCounting() {
    const allProductCounting = await this.dataSource.query(
      `SELECT id FROM products`,
    );
    return allProductCounting.length;
  }
}
