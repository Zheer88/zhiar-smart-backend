import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../channels/entities/channel.entity';
import axios from 'axios';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  async importFromM3uUrl(url: string) {
    try {
      const response = await axios.get(url);
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

          // دۆزینەوەی لۆگۆ بە چەند شێوازێکی جیاواز
          const logoMatch = line.match(/tvg-logo="([^"]+)"/) || line.match(/tvg-logo=([^\s]+)/);
          if (logoMatch && logoMatch[1]) {
            currentLogo = logoMatch[1].trim();
          }

          // دۆزینەوەی ناوی کەناڵ دوای کۆتا کۆما
          const commaIndex = line.lastIndexOf(',');
          if (commaIndex !== -1) {
            currentName = line.substring(commaIndex + 1).trim();
          }
        } else if (line && !line.startsWith('#')) {
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
            } else {
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
    } catch (error) {
      this.logger.error('Failed to import M3U', error);
      throw new Error('هەڵە لە هێنانی فایلی M3U روویدا');
    }
  }
}
