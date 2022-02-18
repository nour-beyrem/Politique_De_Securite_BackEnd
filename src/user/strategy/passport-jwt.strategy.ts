/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { PayloadInterface } from "../interface/payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService,
    @InjectRepository(UserEntity)
    private adminRepository: Repository<UserEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'nourSecretKey',
    });
  }

  async validate(payload: PayloadInterface) {         
    console.log(payload);
    const user = await this.adminRepository.findOne({username: payload.username});
    if (user) {
      delete user.salt;
      delete user.password;
      return user;
    } else {
      
      throw new UnauthorizedException();
    }
     
 
   
  }
}