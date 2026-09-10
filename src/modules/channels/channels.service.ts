import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './entities/channel.entity';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class ChannelsService {
  private readonly logger = new Logger(ChannelsService.name);
  private readonly CACHE_KEY = 'zhiar_smart:channels:all';

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    private readonly redisService: RedisService,
  ) {}

  async findAll(): Promise<Channel[]> {
    try {
      const client = this.redisService.getClient();
      const cached = await client.get(this.CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      this.logger.warn('Redis cache lookup failed, querying DB directly');
    }

    const channels = await this.channelRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });

    try {
      const client = this.redisService.getClient();
      await client.set(this.CACHE_KEY, JSON.stringify(channels), 'EX', 3600);
    } catch (err) {
      this.logger.warn('Failed to cache channels in Redis');
    }

    return channels;
  }

  async invalidateCache(): Promise<void> {
    const client = this.redisService.getClient();
    await client.del(this.CACHE_KEY);
  }
}
