import { IsNotEmpty } from 'class-validator';

export class ConfirmUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly code: string;
}
