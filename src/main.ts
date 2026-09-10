import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  // ناساندنی فۆڵدەری public بۆ ئەوەی ڕاستەوخۆ دەستی پێ بگات
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Zhiar Smart Backend is running on: http://localhost:${port}`);
}
bootstrap();
