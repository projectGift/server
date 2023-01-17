import { Body, Controller, Post } from '@nestjs/common';
import { SuggestDto } from './dto/suggest.dto';
import { SuggestService } from './suggest.service';

@Controller('suggest')
export class SuggestController {
  constructor(private readonly suggestService: SuggestService) {}

  @Post()
  async getSuggestProduct(@Body() body: SuggestDto) {
    return this.suggestService.getSuggestProduct(body);
  }
}
