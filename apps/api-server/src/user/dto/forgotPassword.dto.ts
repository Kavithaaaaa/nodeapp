import { IsNotEmpty } from 'class-validator';

export class forgotPasswordDto {
  @IsNotEmpty()
  readonly email: string;
}
