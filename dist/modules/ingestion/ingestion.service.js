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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var IngestionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const channel_entity_1 = require("../channels/entities/channel.entity");
const axios_1 = __importDefault(require("axios"));
let IngestionService = IngestionService_1 = class IngestionService {
    channelRepository;
    logger = new common_1.Logger(IngestionService_1.name);
    constructor(channelRepository) {
        this.channelRepository = channelRepository;
    }
    async importFromM3uUrl(url) {
        try {
            const response = await axios_1.default.get(url);
            const data = response.data;
            const lines = data.split('\n');
            let count = 0;
            let currentLogo = '';
            let currentName = '';
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line.startsWith('#EXTINF:')) {
                    currentLogo = '';
                    currentName = '';
                    const logoMatch = line.match(/tvg-logo="([^"]+)"/) || line.match(/tvg-logo=([^\s]+)/);
                    if (logoMatch && logoMatch[1]) {
                        currentLogo = logoMatch[1].trim();
                    }
                    const commaIndex = line.lastIndexOf(',');
                    if (commaIndex !== -1) {
                        currentName = line.substring(commaIndex + 1).trim();
                    }
                }
                else if (line && !line.startsWith('#')) {
                    const streamUrl = line;
                    if (currentName && streamUrl) {
                        let existing = await this.channelRepository.findOne({
                            where: { name: currentName },
                        });
                        if (existing) {
                            existing.streamUrl = streamUrl;
                            if (currentLogo) {
                                existing.logo = currentLogo;
                            }
                            await this.channelRepository.save(existing);
                        }
                        else {
                            const newChannel = this.channelRepository.create({
                                name: currentName,
                                streamUrl: streamUrl,
                                logo: currentLogo || '',
                                isActive: true,
                            });
                            await this.channelRepository.save(newChannel);
                            count++;
                        }
                    }
                }
            }
            return { message: `کەناڵەکان بە سەرکەوتوویی نوێ کرانەوە و لۆگۆکان ڕێکخران`, count };
        }
        catch (error) {
            this.logger.error('Failed to import M3U', error);
            throw new Error('هەڵە لە هێنانی فایلی M3U روویدا');
        }
    }
};
exports.IngestionService = IngestionService;
exports.IngestionService = IngestionService = IngestionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channel_entity_1.Channel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IngestionService);
//# sourceMappingURL=ingestion.service.js.map