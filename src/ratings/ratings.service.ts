import { Injectable } from '@nestjs/common';
import { RatingsRepository } from './ratings.repository';

@Injectable()
export class RatingsService {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async addProductRating(userId, productId, ratingId) {
    return this.ratingsRepository.addProductRating(userId, productId, ratingId);
  }

  async addServiceRating(userId, questionnaireId, comment) {
    return this.ratingsRepository.addServiceRating(
      userId,
      questionnaireId,
      comment,
    );
  }
}
