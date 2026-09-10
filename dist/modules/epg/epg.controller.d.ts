import { EpgService } from './epg.service';
export declare class EpgController {
    private readonly epgService;
    constructor(epgService: EpgService);
    getSync(tvgId: string, since?: string): Promise<import("./entities/epg-program.entity").EpgProgram[]>;
}
