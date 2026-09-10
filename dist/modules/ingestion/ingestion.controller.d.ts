import { IngestionService } from './ingestion.service';
export declare class IngestionController {
    private readonly ingestionService;
    constructor(ingestionService: IngestionService);
    importM3u(url: string): Promise<{
        message: string;
        count: number;
    }>;
}
