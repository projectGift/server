import { PickType } from '@nestjs/swagger';
import { ServiceRating } from '../entities/questionnaire_results.entity';

export class RequestServiceRatingDto extends PickType(ServiceRating, [
  'userId',
  'questionnaireId',
  'comment',
] as const) {}
