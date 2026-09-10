import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import type { Response } from 'express';
import axios from 'axios';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  async getChannels() {
    return this.channelsService.findAll();
  }

  @Get('stream-proxy')
  async proxyStream(@Query('url') url: string, @Res() res: Response) {
    if (!url) return res.status(HttpStatus.BAD_REQUEST).send('URL required');

    try {
      const response = await axios.get(url, {
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
    } catch (e) {
      return res.status(HttpStatus.BAD_GATEWAY).send('Stream unavailable');
    }
  }

  @Get('logo-proxy')
  async proxyLogo(@Query('url') url: string, @Res() res: Response) {
    if (!url) return res.status(HttpStatus.BAD_REQUEST).send('URL required');
    try {
      const response = await axios.get(url, {
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
    } catch (e) {
      return res.redirect('https://cdn-icons-png.flaticon.com/512/777/777242.png');
    }
  }
}
