import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { EpgController } from './epg.controller';
import { EpgService } from './epg.service';
import { EpgProgram } from './entities/epg-program.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EpgProgram]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [EpgController],
  providers: [EpgService],
  exports: [EpgService, TypeOrmModule],
})
export class EpgModule {}
