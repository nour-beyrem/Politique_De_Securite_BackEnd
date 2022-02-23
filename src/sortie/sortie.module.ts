/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortieActifEntity } from 'src/entities/sortie-actif.entity';
import { UserModule } from 'src/user/user.module';
import { SortieController } from './sortie.controller';
import { SortieService } from './sortie.service';

@Module({
  controllers: [SortieController],
  providers: [SortieService],
  exports: [SortieService],
  imports: [UserModule,TypeOrmModule.forFeature([SortieActifEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class SortieModule {}
