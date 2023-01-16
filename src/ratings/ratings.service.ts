import { Injectable, NotFoundException } from '@nestjs/common';
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
    const listArr = await this.ratingsRepository.getProductRatings(productId);

    if (listArr.length === 0) {
      throw new NotFoundException(
        `Can't find product ratings with id ${productId}`,
      );
    }

    const ratings = [];
    listArr.forEach((el) => ratings.push(el.ratingId));

    const average = ratings.reduce((a, c) => a + c) / ratings.length;

    const result = {
      productId,
      average,
    };

    return result;
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
}
