import { RatingsService } from './ratings.service';
import { Controller, Get, Post, Query, Body, Param } from '@nestjs/common';
import { RequestProductRatingDto } from './dto/productRating.request.dto';
import { RequestServiceRatingDto } from './dto/serviceRating.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @ApiOperation({ summary: '상품 만족도 생성' })
  @ApiResponse({
    status: 201,
    description: '성공!',
  })
  @Post('/product')
  addProductRating(@Body() body: RequestProductRatingDto) {
    const { userId, productId, ratingId } = body;

    return this.ratingsService.addProductRating(userId, productId, ratingId);
  }

  @ApiOperation({
    summary: '상품별 유저별 상품 평점 데이터 조회',
    description: '인자 2개 중 하나만 써도 조회 가능',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
  })
  @Get('/product?')
  getProductRatings(@Query() query) {
    const { productId, userId } = query;

    return this.ratingsService.getProductRatings(productId, userId);
  }

  @ApiOperation({
    summary: '우리 DB 내 저장된 해당 상품의 평균 평점 조회',
    description: '평점 합계 / 평가 수',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
  })
  @ApiResponse({
    status: 404,
    description: '해당 제품 아이디로 저장된 평가 없음',
  })
  @Get('/product/:productId/avg')
  getAvgRating(@Param('productId') productId) {
    return this.ratingsService.getAvgRating(productId);
  }

  @ApiOperation({ summary: '서비스 만족도 생성' })
  @ApiResponse({
    status: 201,
    description: '성공!',
  })
  @Post('/service')
  addServiceRating(@Body() body: RequestServiceRatingDto) {
    const { userId, questionnaireId, comment } = body;

    return this.ratingsService.addServiceRating(
      userId,
      questionnaireId,
      comment,
    );
  }

  @ApiOperation({ summary: '서비스 만족도 설문지 전체 조회' })
  @ApiResponse({
    status: 200,
    description: '성공!',
  })
  @Get('/service/all')
  getAllServiceQuestionnaire() {
    return this.ratingsService.getAllServiceQuestionnaire();
  }
}
