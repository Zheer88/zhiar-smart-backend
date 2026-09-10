import { RedisService } from '../../redis/redis.service';
export declare class HealthService {
    private readonly redisService;
    private readonly logger;
    constructor(redisService: RedisService);
    checkStatus(): Promise<{
        status: string;
        timestamp: string;
        services: {
            database: string;
            redis: string;
        };
    }>;
}
