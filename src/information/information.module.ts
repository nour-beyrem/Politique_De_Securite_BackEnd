/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationEntity } from 'src/entities/information.entity';
import { UserModule } from 'src/user/user.module';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';

@Module({
  controllers: [InformationController],
  providers: [InformationService],
  exports: [InformationService],
  imports: [UserModule,TypeOrmModule.forFeature([InformationEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class InformationModule {}
