import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { typeORMConfig } from './common/config/ormconfig';
import { SuggestModule } from './suggest/suggest.module';
import { DataImportModule } from './data-import/data-import.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeORMConfig),
    MorganModule,
    SuggestModule,
    DataImportModule,
  ],
  controllers: [],
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: MorganInterceptor('dev') },
  ],
})
export class AppModule {}
