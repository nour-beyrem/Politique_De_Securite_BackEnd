import { Module } from '@nestjs/common';
import { MatriceController } from './matrice.controller';
import { MatriceService } from './matrice.service';

@Module({
  controllers: [MatriceController],
  providers: [MatriceService]
})
export class MatriceModule {}
