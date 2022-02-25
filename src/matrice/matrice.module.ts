/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatriceFluxEntity } from 'src/entities/matrice-flux.entity';
import { UserModule } from 'src/user/user.module';
import { MatriceController } from './matrice.controller';
import { MatriceService } from './matrice.service';

@Module({
  controllers: [MatriceController],
  providers: [MatriceService],
  exports: [MatriceService],
  imports: [UserModule,TypeOrmModule.forFeature([MatriceFluxEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class MatriceModule {}
