import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataImportService } from './data-import.service';

@Controller('data-import')
export class DataImportController {
  constructor(private readonly dataImportService: DataImportService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  importCsvDataInDatabase(@UploadedFile() file) {
    return this.dataImportService.importCsvDataInDatabase(file);
  }

  @Get()
  getOgImage() {
    return this.dataImportService.getOgImage();
  }
}
