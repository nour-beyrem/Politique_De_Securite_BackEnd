/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelluleEntity } from 'src/entities/cellule.entity';
import { UserModule } from 'src/user/user.module';
import { CelluleController } from './cellule.controller';
import { CelluleService } from './cellule.service';

@Module({
  controllers: [CelluleController],
  providers: [CelluleService],
  exports: [CelluleService],
  imports: [UserModule,TypeOrmModule.forFeature([CelluleEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class CelluleModule {}
