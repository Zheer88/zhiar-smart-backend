import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { EpgProgram } from './entities/epg-program.entity';

@Injectable()
export class EpgService {
  constructor(
    @InjectRepository(EpgProgram)
    private readonly epgRepo: Repository<EpgProgram>,
  ) {}

  async getDeltaSync(tvgId: string, since?: string): Promise<EpgProgram[]> {
    const now = since ? new Date(since) : new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    return this.epgRepo.find({
      where: {
        channelTvgId: tvgId,
        start: Between(now, next24Hours),
      },
      order: { start: 'ASC' },
      take: 20,
    });
  }
}
