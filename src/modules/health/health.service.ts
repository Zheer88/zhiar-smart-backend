import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    private readonly redisService: RedisService,
  ) {}

  async checkStatus() {
    let redisStatus = 'down';

    try {
      const client = this.redisService.getClient();
      if (client) {
        const pong = await client.ping();
        if (pong === 'PONG') {
          redisStatus = 'up';
        }
      }
    } catch (e: any) {
      const msg = e instanceof Error ? e.message : String(e);
      redisStatus = `error: ${msg}`;
      this.logger.error(`Redis Health Error: ${msg}`);
    }

    return {
      status: redisStatus === 'up' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        redis: redisStatus,
      },
    };
  }
}
