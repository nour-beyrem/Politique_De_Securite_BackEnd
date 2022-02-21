/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RapportEntity } from 'src/entities/rapport.entity';
import { UserModule } from 'src/user/user.module';
import { RapportController } from './rapport.controller';
import { RapportService } from './rapport.service';

@Module({
  controllers: [RapportController],
  providers: [RapportService],
  exports: [RapportService],
  imports: [UserModule,TypeOrmModule.forFeature([RapportEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class RapportModule {}
