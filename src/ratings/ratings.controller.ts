import { RatingsService } from './ratings.service';
import { Controller, Get, Post, Query, Body, Param } from '@nestjs/common';
import { RequestProductRatingDto } from './dto/productRating.request.dto';
import { RequestServiceRatingDto } from './dto/serviceRating.request.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  // 상품 만족도 생성
  @Post('/product')
  addProductRating(@Body() body: RequestProductRatingDto) {
    const { userId, productId, ratingId } = body;

    return this.ratingsService.addProductRating(userId, productId, ratingId);
  }

  // 상품별 유저별 만족도 데이터 조회
  // 인자 2개 중 하나만 써도 조회 가능
  @Get('/product?')
  getProductRatings(@Query() query) {
    const { productId, userId } = query;

    return this.ratingsService.getProductRatings(productId, userId);
  }

  // 해당 상품의 평균 평점 조회 (우리 DB)
  @Get('/product/:productId/avg')
  getAvgRating(@Param('productId') productId) {
    return this.ratingsService.getAvgRating(productId);
  }

  // 서비스 만족도 생성
  @Post('/service')
  addServiceRating(@Body() body: RequestServiceRatingDto) {
    const { userId, questionnaireId, comment } = body;

    return this.ratingsService.addServiceRating(
      userId,
      questionnaireId,
      comment,
    );
  }

  // 서비스 만족도 설문지 전체 조회
  @Get('/service/all')
  getAllServiceQuestionnaire() {
    return this.ratingsService.getAllServiceQuestionnaire();
  }

  // 질문별 유저별 응답 데이터 조회
  @Get('/service?')
  getServiceQuestionnaire(@Query() query) {
    const { userId, questionnaireId } = query;

    return this.ratingsService.getServiceQuestionnaire(userId, questionnaireId);
  }
}
