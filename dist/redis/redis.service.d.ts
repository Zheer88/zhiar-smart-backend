import { OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
export declare class RedisService implements OnModuleDestroy {
    private readonly configService;
    private readonly client;
    private readonly logger;
    constructor(configService: ConfigService);
    getClient(): Redis;
    onModuleDestroy(): Promise<void>;
}
