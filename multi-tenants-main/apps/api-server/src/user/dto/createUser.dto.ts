import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { BaseUserDto } from './baseUser.dto';

import { ERROR } from './../../common/constants/';
const { PASSWORD_WEAK } = ERROR;

export class CreateUserDto extends BaseUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: PASSWORD_WEAK,
  })
  password: string;

  @IsNotEmpty()
  phonenumber: string;

  @IsNotEmpty()
  zipcode: number;
}
