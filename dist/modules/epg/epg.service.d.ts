import { Repository } from 'typeorm';
import { EpgProgram } from './entities/epg-program.entity';
export declare class EpgService {
    private readonly epgRepo;
    constructor(epgRepo: Repository<EpgProgram>);
    getDeltaSync(tvgId: string, since?: string): Promise<EpgProgram[]>;
}
