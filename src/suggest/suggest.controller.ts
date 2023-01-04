import { Controller, Get, Post } from '@nestjs/common';
import { SuggestService } from './suggest.service';

@Controller('suggest')
export class SuggestController {
  constructor(private readonly suggestService: SuggestService) {}

  @Post()
  async getSuggestProduct() {
    return this.suggestService.getSuggestProduct();
  }
}
