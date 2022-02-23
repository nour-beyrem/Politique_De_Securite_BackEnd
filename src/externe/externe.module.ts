/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExterneEntity } from 'src/entities/externe.entity';
import { UserModule } from 'src/user/user.module';
import { ExterneController } from './externe.controller';
import { ExterneService } from './externe.service';

@Module({
  controllers: [ExterneController],
  providers: [ExterneService],
  exports: [ExterneService],
  imports: [UserModule,TypeOrmModule.forFeature([ExterneEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
    secret: 'nourSecretKey',
    signOptions: {
      expiresIn: 3600
    }
     })]
})
export class ExterneModule {}
