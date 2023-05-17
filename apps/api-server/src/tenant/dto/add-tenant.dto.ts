import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsStringArray } from '../../common/validators';

import { CONSTS } from '../../common/constants/';
const { ADDITIONAL_FEATURE, PROGRAMS } = CONSTS;

export class TenantDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  contactNumber: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zipCode: number;

  @IsNotEmpty()
  timeZone: string;

  @IsNotEmpty()
  domainName: string;

  @IsNotEmpty()
  databaseName: string;

  @IsString()
  @IsOptional()
  clientLogo: string;

  @IsNotEmpty()
  accentColor: string;

  @IsString()
  @IsOptional()
  @Validate(IsStringArray, PROGRAMS)
  programs: string;

  @IsString()
  @IsOptional()
  @Validate(IsStringArray, ADDITIONAL_FEATURE)
  additionalFeature: string;

  @IsString()
  stateRegion: string;
}

export interface SearchDto {
  query: string;
}

export class EditTenantDto {
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  contactNumber: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsOptional()
  zipCode: number;

  @IsString()
  @IsOptional()
  timeZone: string;

  @IsString()
  @IsOptional()
  domainName: string;

  @IsString()
  @IsOptional()
  databaseName: string;

  @IsString()
  @IsOptional()
  clientLogo: string;

  @IsString()
  @IsOptional()
  accentColor: string;

  @IsOptional()
  @Validate(IsStringArray, PROGRAMS)
  programs: string;

  @IsOptional()
  @Validate(IsStringArray, ADDITIONAL_FEATURE)
  additionalFeature: string;

  @IsOptional()
  isArchive: boolean;

  @IsOptional()
  isDelete: boolean;
}
