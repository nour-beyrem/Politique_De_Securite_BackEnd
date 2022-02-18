/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsOptional, MaxLength, minLength, MinLength } from 'class-validator';
import { ErrorMessgaes } from '../error-message.common';

export class updateUserDto {
 @IsOptional()
 @MinLength(3, {
      message: ErrorMessgaes.tooShort,
    })
 @MaxLength(10, {
      message: ErrorMessgaes.tooLong,
    })
    prenom: string;
  @IsOptional()
  @MinLength(3, {
    message: ErrorMessgaes.tooShort,
  })
  @MaxLength(10, {
    message: ErrorMessgaes.tooLong,
  })
  nom: string;
  @IsOptional()
  @MinLength(8, {
    message: ErrorMessgaes.tooShort,
  })
  @MaxLength(8, {
    message: ErrorMessgaes.tooLong,
  })
  cin: number;
}
