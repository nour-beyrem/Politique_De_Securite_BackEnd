/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActifEntity } from 'src/entities/actif.entity';
import { UserModule } from 'src/user/user.module';
import { ActifController } from './actif.controller';
import { ActifService } from './actif.service';

@Module({
  controllers: [ActifController],
  providers: [ActifService],
  exports: [ActifService],
  imports: [UserModule,TypeOrmModule.forFeature([ActifEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class ActifModule {}
