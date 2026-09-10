import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async check(@Res() res: Response) {
    try {
      const result = await this.healthService.checkStatus();
      return res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      const msg = error instanceof Error ? error.message : String(error);
      return res.status(HttpStatus.OK).json({
        status: 'error_caught',
        message: msg,
      });
    }
  }
}
