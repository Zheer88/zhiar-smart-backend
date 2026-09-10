import { Controller, Post, Body } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('import-m3u')
  async importM3u(@Body('url') url: string) {
    return this.ingestionService.importFromM3uUrl(url);
  }
}
