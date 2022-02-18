/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty } from "class-validator";

export class LoginCredentialsDto {

  @IsNotEmpty()
    username: string;

  @IsNotEmpty()
   password: string;

}