import { DataSource } from 'typeorm';

export class Test {
  constructor(private readonly dataSource: DataSource) {}

  async getTest(entity, column) {
    // console.log(entity, column);
    const result = await this.dataSource
      .createQueryBuilder(entity, `${column}_lists`)
      .select([`${column}_lists.id`])
      .getMany();
    console.log(result);

    return result;
  }
}
