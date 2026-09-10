import { Repository } from 'typeorm';
import { Channel } from '../channels/entities/channel.entity';
export declare class IngestionService {
    private readonly channelRepository;
    private readonly logger;
    constructor(channelRepository: Repository<Channel>);
    importFromM3uUrl(url: string): Promise<{
        message: string;
        count: number;
    }>;
}
