"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChannelsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const channel_entity_1 = require("./entities/channel.entity");
const redis_service_1 = require("../../redis/redis.service");
let ChannelsService = ChannelsService_1 = class ChannelsService {
    channelRepository;
    redisService;
    logger = new common_1.Logger(ChannelsService_1.name);
    CACHE_KEY = 'zhiar_smart:channels:all';
    constructor(channelRepository, redisService) {
        this.channelRepository = channelRepository;
        this.redisService = redisService;
    }
    async findAll() {
        try {
            const client = this.redisService.getClient();
            const cached = await client.get(this.CACHE_KEY);
            if (cached) {
                return JSON.parse(cached);
            }
        }
        catch (err) {
            this.logger.warn('Redis cache lookup failed, querying DB directly');
        }
        const channels = await this.channelRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
        try {
            const client = this.redisService.getClient();
            await client.set(this.CACHE_KEY, JSON.stringify(channels), 'EX', 3600);
        }
        catch (err) {
            this.logger.warn('Failed to cache channels in Redis');
        }
        return channels;
    }
    async invalidateCache() {
        const client = this.redisService.getClient();
        await client.del(this.CACHE_KEY);
    }
};
exports.ChannelsService = ChannelsService;
exports.ChannelsService = ChannelsService = ChannelsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channel_entity_1.Channel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        redis_service_1.RedisService])
], ChannelsService);
//# sourceMappingURL=channels.service.js.map