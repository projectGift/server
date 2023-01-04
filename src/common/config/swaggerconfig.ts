import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Gift Suggestion Project')
  .setDescription('Gift Suggestion to user choice filter')
  .setVersion('0.0.1')
  .addTag('suggestion')
  .build();
