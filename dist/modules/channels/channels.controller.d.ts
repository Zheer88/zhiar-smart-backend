import { ChannelsService } from './channels.service';
import type { Response } from 'express';
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    getChannels(): Promise<import("./entities/channel.entity").Channel[]>;
    proxyStream(url: string, res: Response): Promise<any>;
    proxyLogo(url: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
}
