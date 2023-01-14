import { RatingsService } from './ratings.service';
import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { RequestProductRatingDto } from './dto/productRating.request.dto';
import { RequestServiceRatingDto } from './dto/serviceRating.request.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  // 상품 만족도
  @Post('/product')
  addProductRating(@Body() body: RequestProductRatingDto) {
    const { userId, productId, ratingId } = body;
    return this.ratingsService.addProductRating(userId, productId, ratingId);
  }

  @Get('/product')
  getProductRating(@Query() query) {
    return 'read ratings';
  }

  // 서비스 만족도
  @Post('/service')
  addServiceRating(@Body() body: RequestServiceRatingDto) {
    const { userId, questionnaireId, comment } = body;
    return this.ratingsService.addServiceRating(
      userId,
      questionnaireId,
      comment,
    );
  }

  @Get('/service/questionnaire')
  getServiceQuestionnaire() {
    return 'all questionnaire';
  }
}
