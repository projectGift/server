import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRating } from './entities/questionnaire_results.entity';
import { ProductRating } from './entities/ratings_products.entity';

@Injectable()
export class RatingsRepository {
  constructor(
    @InjectRepository(ProductRating)
    private productRatingRepository: Repository<ProductRating>,
    @InjectRepository(ServiceRating)
    private serviceRatingRepository: Repository<ServiceRating>,
  ) {}

  async addProductRating(userId, productId, ratingId): Promise<ProductRating> {
    const createdRating = this.productRatingRepository.create({
      userId,
      productId,
      ratingId,
    });

    await this.productRatingRepository.save(createdRating);
    return createdRating;
  }

  async addServiceRating(
    userId,
    questionnaireId,
    comment,
  ): Promise<ServiceRating> {
    const createdRating = this.serviceRatingRepository.create({
      userId,
      questionnaireId,
      comment,
    });

    this.serviceRatingRepository.save(createdRating);
    return createdRating;
  }
}
