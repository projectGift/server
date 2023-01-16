import { PickType } from '@nestjs/swagger';
import { ProductRating } from '../entities/ratings_products.entity';

export class RequestProductRatingDto extends PickType(ProductRating, [
  'userId',
  'productId',
  'ratingId',
] as const) {}
