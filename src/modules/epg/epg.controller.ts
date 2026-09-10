import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EpgService } from './epg.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('epg')
export class EpgController {
  constructor(private readonly epgService: EpgService) {}

  @UseGuards(JwtAuthGuard)
  @Get('sync')
  async getSync(
    @Query('tvgId') tvgId: string,
    @Query('since') since?: string,
  ) {
    return this.epgService.getDeltaSync(tvgId, since);
  }
}
