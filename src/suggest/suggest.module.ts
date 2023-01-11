import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/data-import/entities/products.entity';
import { SuggestController } from './suggest.controller';
import { SuggestService } from './suggest.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  controllers: [SuggestController],
  providers: [SuggestService],
})
export class SuggestModule {}
