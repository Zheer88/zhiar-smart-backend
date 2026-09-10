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
var HealthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../redis/redis.service");
let HealthService = HealthService_1 = class HealthService {
    redisService;
    logger = new common_1.Logger(HealthService_1.name);
    constructor(redisService) {
        this.redisService = redisService;
    }
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
        }
        catch (e) {
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
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = HealthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], HealthService);
//# sourceMappingURL=health.service.js.map