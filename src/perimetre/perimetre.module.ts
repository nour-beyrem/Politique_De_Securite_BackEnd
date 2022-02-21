/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerimetreEntity } from 'src/entities/perimetre.entity';
import { UserModule } from 'src/user/user.module';
import { PerimetreController } from './perimetre.controller';
import { PerimetreService } from './perimetre.service';

@Module({
  controllers: [PerimetreController],
  providers: [PerimetreService],
  exports: [PerimetreService],
  imports: [UserModule,TypeOrmModule.forFeature([PerimetreEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class PerimetreModule {}
