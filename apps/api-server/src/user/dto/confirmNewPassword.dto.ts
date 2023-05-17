import { IsNotEmpty } from 'class-validator';

export class confirmNewPasswordDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly code: string;
}
