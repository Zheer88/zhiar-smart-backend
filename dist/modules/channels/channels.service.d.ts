import { Repository } from 'typeorm';
import { Channel } from './entities/channel.entity';
import { RedisService } from '../../redis/redis.service';
export declare class ChannelsService {
    private readonly channelRepository;
    private readonly redisService;
    private readonly logger;
    private readonly CACHE_KEY;
    constructor(channelRepository: Repository<Channel>, redisService: RedisService);
    findAll(): Promise<Channel[]>;
    invalidateCache(): Promise<void>;
}
