import { Module } from '@nestjs/common';
import { SortieController } from './sortie.controller';
import { SortieService } from './sortie.service';

@Module({
  controllers: [SortieController],
  providers: [SortieService]
})
export class SortieModule {}
