import { Injectable } from '@nestjs/common';
import { RatingsRepository } from './ratings.repository';

@Injectable()
export class RatingsService {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async addProductRating(userId, productId, ratingId) {
    return this.ratingsRepository.addProductRating(userId, productId, ratingId);
  }

  async getProductRatings(productId, userId) {
    return this.ratingsRepository.getProductRatings(productId, userId);
  }

  async getAvgRating(productId) {
    return this.ratingsRepository.getAvgRating(productId);
  }

  async addServiceRating(userId, questionnaireId, comment) {
    return this.ratingsRepository.addServiceRating(
      userId,
      questionnaireId,
      comment,
    );
  }

  async getAllServiceQuestionnaire() {
    return this.ratingsRepository.getAllServiceQuestionnaire();
  }

  async getServiceQuestionnaire(userId, questionnaireId) {
    return this.ratingsRepository.getServiceQuestionnaire(
      userId,
      questionnaireId,
    );
  }
}
