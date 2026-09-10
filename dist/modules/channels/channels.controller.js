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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsController = void 0;
const common_1 = require("@nestjs/common");
const channels_service_1 = require("./channels.service");
const axios_1 = __importDefault(require("axios"));
let ChannelsController = class ChannelsController {
    channelsService;
    constructor(channelsService) {
        this.channelsService = channelsService;
    }
    async getChannels() {
        return this.channelsService.findAll();
    }
    async proxyStream(url, res) {
        if (!url)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send('URL required');
        try {
            const response = await axios_1.default.get(url, {
                responseType: 'stream',
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                },
            });
            res.setHeader('Access-Control-Allow-Origin', '*');
            const contentType = response.headers['content-type'];
            res.setHeader('Content-Type', typeof contentType === 'string' ? contentType : 'application/vnd.apple.mpegurl');
            return response.data.pipe(res);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_GATEWAY).send('Stream unavailable');
        }
    }
    async proxyLogo(url, res) {
        if (!url)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send('URL required');
        try {
            const response = await axios_1.default.get(url, {
                responseType: 'arraybuffer',
                timeout: 5000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                },
            });
            res.setHeader('Access-Control-Allow-Origin', '*');
            const contentType = response.headers['content-type'];
            res.setHeader('Content-Type', typeof contentType === 'string' ? contentType : 'image/png');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            return res.send(response.data);
        }
        catch (e) {
            return res.redirect('https://cdn-icons-png.flaticon.com/512/777/777242.png');
        }
    }
};
exports.ChannelsController = ChannelsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "getChannels", null);
__decorate([
    (0, common_1.Get)('stream-proxy'),
    __param(0, (0, common_1.Query)('url')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "proxyStream", null);
__decorate([
    (0, common_1.Get)('logo-proxy'),
    __param(0, (0, common_1.Query)('url')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "proxyLogo", null);
exports.ChannelsController = ChannelsController = __decorate([
    (0, common_1.Controller)('channels'),
    __metadata("design:paramtypes", [channels_service_1.ChannelsService])
], ChannelsController);
//# sourceMappingURL=channels.controller.js.map