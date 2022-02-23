/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeAutorisationEntity } from 'src/entities/demande-autorisation.entity';
import { UserModule } from 'src/user/user.module';
import { AutorisationController } from './autorisation.controller';
import { AutorisationService } from './autorisation.service';

@Module({
  controllers: [AutorisationController],
  providers: [AutorisationService],
  exports: [AutorisationService],
  imports: [UserModule,TypeOrmModule.forFeature([DemandeAutorisationEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class AutorisationModule {}
