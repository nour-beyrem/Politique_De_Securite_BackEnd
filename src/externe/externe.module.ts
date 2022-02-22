import { Module } from '@nestjs/common';
import { ExterneController } from './externe.controller';
import { ExterneService } from './externe.service';

@Module({
  controllers: [ExterneController],
  providers: [ExterneService]
})
export class ExterneModule {}
