/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReunionEntity } from 'src/entities/reunion.entity';
import { UserModule } from 'src/user/user.module';
import { ReunionController } from './reunion.controller';
import { ReunionService } from './reunion.service';

@Module({
  controllers: [ReunionController],
  providers: [ReunionService],
  exports: [ReunionService],
  imports: [UserModule,TypeOrmModule.forFeature([ReunionEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class ReunionModule {}
