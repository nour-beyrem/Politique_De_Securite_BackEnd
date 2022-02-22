import { Module } from '@nestjs/common';
import { AutorisationController } from './autorisation.controller';
import { AutorisationService } from './autorisation.service';

@Module({
  controllers: [AutorisationController],
  providers: [AutorisationService]
})
export class AutorisationModule {}
