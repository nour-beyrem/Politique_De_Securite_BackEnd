/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgrammeSensibilisationEntity } from 'src/entities/programme-sensibilisation.entity';
import { UserModule } from 'src/user/user.module';
import { ProgrammeController } from './programme.controller';
import { ProgrammeService } from './programme.service';

@Module({
  controllers: [ProgrammeController],
  providers: [ProgrammeService],
  exports: [ProgrammeService],
  imports: [UserModule,TypeOrmModule.forFeature([ProgrammeSensibilisationEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class ProgrammeModule {}
