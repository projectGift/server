import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SuggestDto } from './dto/suggest.dto';

@Injectable()
export class SuggestService {
  constructor(private readonly dataSource: DataSource) {}

  async getProductId(startPrice, endPrice, tableName) {
    // 가격에 맞는 상품들을 반환
    const priceSortProductId = await this.dataSource.query(`
    SELECT id FROM products WHERE product_price BETWEEN ${startPrice} AND ${endPrice}
  `);

    // id만 받아올 수 있도록 데이터 구조 변경
    const productId = Object.values(priceSortProductId).map(
      (item) => item['id'],
    );

    // 라벨링 데이터에 맞는 상품들을 반환
    const listData = await this.dataSource.query(`
    SELECT products_id FROM products_${tableName[0]}_lists WHERE ${tableName[0]}_lists_id = ${tableName[1]}
    `);

    const exceptAgeProduct = await this.dataSource.query(`
      SELECT products_id FROM products_age_lists WHERE age_lists_id = 3 OR age_lists_id = 2 OR age_lists_id = 4 OR age_lists_id = 5 
    `);

    const exceptAgeProductId = exceptAgeProduct.map(
      (item) => item['products_id'],
    );

    // id만 받아올 수 있도록 데이터 구조 변경
    const productIdList: number[] = listData.map((item) => item['products_id']);

    // 서로 중복되는 값들만 새롭게 반환
    let filtering = productIdList
      .filter((item) => productId.indexOf(item) !== -1)
      .filter((item) => exceptAgeProductId.indexOf(item) === -1);

    if (
      tableName[0] === 'age' &&
      (tableName[1] === 2 ||
        tableName[1] === 3 ||
        tableName[1] === 4 ||
        tableName[1] === 5)
    ) {
      filtering = productIdList;
    }

    return filtering;
  }

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

    // 라벨링명과 들어온 데이터를 배열의 형태로 변경
    const getTableNameLabeling = Object.entries(labelingData).filter(
      (item) => typeof item[1] === 'number',
    );

    // 라벨링 중 배열로 들어오는 항목들을 체크
    const getMultiLabeling = Object.entries(labelingData).filter(
      (item) => typeof item[1] !== 'number',
    );

    // 배열 형태로 들어온 라벨링들을 풀어내서 getTableNameLabeling에 push해준다 (같은 데이터 형식으로 맞추기 위해)
    getMultiLabeling.map((key: any[]) =>
      key[1].map((item) => getTableNameLabeling.push([key[0], item])),
    );

    let productId;

    // 크리티컬하다고 생각되는 부분은 미리 상품군에서 제외하는 로직
    for (const tableName of getTableNameLabeling) {
      // 둘 다를 선택하면 상관없는 것이기 때문에 전체 상품이 나와야하기 때문에 라벨링을 전체 다 달아줬음
      // 남자를 선택하면 남자가 포함된 상품만 나와야한다 (여자 라벨링 되어있는 상품 제외)
      // 여자를 선택하면 여자가 포함된 상품만 나와야한다 (남자 라벨링 되어있는 상품 제외)
      if (tableName[0] === 'gender') {
        productId = await this.getProductId(
          body.price.start,
          body.price.end,
          tableName,
        );
      }

      // age에서 반려동물, 아기, 어린이, 초등학생이 나왔을 때는 해당 상품만 남기고 나머지를 다 자른다
      if (
        tableName[0] === 'age' &&
        (tableName[1] === 2 ||
          tableName[1] === 3 ||
          tableName[1] === 4 ||
          tableName[1] === 5)
      ) {
        productId = await this.getProductId(
          body.price.start,
          body.price.end,
          tableName,
        );
      }
    }

    const getProductIdFromLabeling = [];

    for (let i = 0; i < getTableNameLabeling.length; i++) {
      const getDataBaseData: [] = await this.dataSource.query(`
        SELECT 
        products_id
        FROM products_${getTableNameLabeling[i][0]}_lists
        WHERE ${getTableNameLabeling[i][0]}_lists_id = ${getTableNameLabeling[i][1]}
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

      if (mostSimilarProducts.length === 0) {
        mostSimilarProducts.push(...priceAndCountProductId);
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
    const randomIntegerArray = [];

    // 랜덤하게 결과값에 push
    for (let i = 0; i < 3; i++) {
      const randomInteger =
        Math.floor(Math.random() * (suggestMaxLength - suggestMinLength + 1)) +
        suggestMinLength;

      // 랜덤 값을 중복되지 않도록 내부에서 확인해줌
      if (!randomIntegerArray.includes(randomInteger)) {
        randomIntegerArray.push(randomInteger);
        randomProductResult.push(reviewSortProductInfo[randomInteger]);
      } else {
        i--;
      }
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
