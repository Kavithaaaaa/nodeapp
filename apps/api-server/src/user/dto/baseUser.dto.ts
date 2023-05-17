import { IsOptional, IsDateString } from 'class-validator';
import { userStatus } from '../../common/enums';

export class BaseUserDto {
  @IsOptional()
  ssn: string;

  @IsOptional()
  status: userStatus;

  @IsOptional()
  createdBy: string;

  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  lastLoggedIn: Date;
}
