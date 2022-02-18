/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ErrorMessgaes } from "../error-message.common";

export class AddUserDto {
    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    @MinLength(3, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(10, {
      message: ErrorMessgaes.tooLong
    })
    prenom: string;

    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    @MinLength(3, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(10, {
      message: ErrorMessgaes.tooLong
    })
    nom: string;
    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    @MinLength(8, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(8, {
        message: ErrorMessgaes.tooLong
      })
    cin: number;

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
   role: string;

  @IsNotEmpty()
   username: string;
  }