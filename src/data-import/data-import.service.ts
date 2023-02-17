import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as xlsx from 'xlsx';
import * as og from 'open-graph';

@Injectable()
export class DataImportService {
  constructor(private readonly dataSource: DataSource) {}

  async createProductsLabelingData(column, productsRows) {
    for (const row of productsRows) {
      // 엑셀에서 받아온 상품명으로 db내의 product table에서 검색해서 나온 상품의 id값
      const getProductId = await this.dataSource.query(`
      SELECT id FROM products WHERE product_name = '${row['product_name']}'
    `);
      // 어떤 상품에 어떤 라벨링이 달려있는지 db 내에서 검색
      const getLabelingInfo: [] = await this.dataSource.query(`
        SELECT ${column}_lists_id, id FROM products_${column}_lists WHERE products_id = ${getProductId[0].id}
      `);

      // 엑셀에서 받아온 데이터와 db에서 받아온 데이터를 같은 구조로 만들어줬음
      const rowData = String(row[column]).split(',').map(Number);
      const getLabelingId: number[] = getLabelingInfo.map(
        (item) => item[`${column}_lists_id`],
      );

      // db내 라벨링이 중복으로 들어가 있는 항목 체크해서 카운팅
      const duplicatedValue = getLabelingInfo
        .map((item) => item[`${column}_lists_id`])
        .reduce(
          (acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }),
          {},
        );

      // 중복된 라벨링 항목을 가져왔음
      const duplicatedLabelingId = Object.entries(duplicatedValue).filter(
        (item) => item[1] !== 1,
      );

      // 중복된 라벨링 값들을 가진 모든 항목들 삭제
      for (let i = 0; i < duplicatedLabelingId.length; i++) {
        await this.dataSource.query(
          `DELETE FROM products_${column}_lists WHERE ${column}_lists_id = ${Number(
            duplicatedLabelingId[i][0],
          )}`,
        );
      }

      // 들어가야 할 라벨링(rowData)과 들어있는 라벨링(getLabelingId)를 비교했을 때
      // 같지 않은 값을 찾았고, 그거를 지금 해당 id와 같지 않은 값을 묶어서 insert into
      await Promise.all(
        rowData
          .filter((item) => !getLabelingId.includes(item))
          .map(async (item) => {
            console.log(getProductId[0].id, item);
            await this.dataSource.query(
              `
  INSERT INTO products_${column}_lists 
  (products_id, ${column}_lists_id) 
  VALUE (?, ?)`,
              [getProductId[0].id, item],
            );
          }),
      );
    }

    return `data import success`;
  }

  async createProductData(productsRows) {
    for (const row of productsRows) {
      // db안에 있는 상품정보들을 엑셀에서 받은 product_name으로 찾아 가져온다.
      const getProductIdInDb = await this.dataSource.query(`
        SELECT product_name, product_price, product_review_count, product_url FROM products WHERE product_name = '${row['product_name']}'
      `);

      // 가져온 상품정보가 없다는 뜻은 해당 상품이 존재하지 않는 것이랑 같으니 해당 상품을 DB에 추가해준다
      if (getProductIdInDb.length === 0) {
        console.log(getProductIdInDb);
        await this.dataSource.query(
          `
          INSERT INTO products (product_name, product_price, product_review_count, product_url) VALUE (?, ?, ?, ?)
        `,
          [
            row['product_name'],
            row['product_price'],
            row['product_review_count'],
            row['product_url'],
          ],
        );
        break;
      }

      // 가져온 상품정보가 존재할 때는 엑셀에서 가져온 데이터로 업데이트하기 위해 객체형식으로 만들어준다.
      const requireUpdateProductInfo = {
        product_name: row['product_name'],
        product_price: row['product_price'],
        product_review_count: row['product_review_count'],
        product_url: row['product_url'],
      };

      // 업데이트 할 내용을 push받을 객체 선언
      const updateInfo = [];

      // 두 객체를 같은 모양으로 데이터 변환
      const excelProductInfoArray = Object.entries(requireUpdateProductInfo);
      const dbProductInfoArray = Object.entries(getProductIdInDb[0]);

      // 돌면서 다른 value를 가지고 있는 요소를 updateInfo에 push
      for (let i = 0; i < dbProductInfoArray.length; i++) {
        if (excelProductInfoArray[i][1] != dbProductInfoArray[i][1]) {
          updateInfo.push(excelProductInfoArray[i]);
        }
      }

      // updataInfo가 0이면 다 같다는 뜻이니 수행하지 않아도 되고
      // 0 이상이면 다른 부분이 있다는 것이니 엑셀파일이 수정됐다고 판단하여 해당 요소를 돌면서 DB에서 찾아 수정해준다
      if (updateInfo.length > 0) {
        for (const x of updateInfo) {
          await this.dataSource.query(`
              UPDATE products SET ${x[0]} = '${x[1]}' WHERE product_name = '${row['product_name']}'
            `);
        }
      }
    }
  }

  async importCsvDataInDatabase(file) {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const productSheetName = workbook.SheetNames[6];
    const productSheet = workbook.Sheets[productSheetName];
    const productsRows: any[] = xlsx.utils.sheet_to_json(productSheet, {
      defval: null,
    });

    const labeling = [
      'gender',
      'age',
      'mbti',
      'personality',
      'relation',
      'time',
      'hobby',
      'season',
      'event',
    ];

    await this.createProductData(productsRows);

    for (let i = 0; i < labeling.length; i++) {
      console.log(labeling[i]);

      await this.createProductsLabelingData(labeling[i], productsRows);
    }

    return 'data import success';
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
