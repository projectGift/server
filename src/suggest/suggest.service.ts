import { Injectable } from '@nestjs/common';

@Injectable()
export class SuggestService {
  async getSuggestProduct() {
    return 'hi';
  }
}
