import { Validate } from 'class-validator';
import { IsObjectId } from './../validators/validateObjectId';
export interface QueryDto {
  limit: number;
  skip: number;
  where?: FormBuilderQuery;
}

// As per the requirement we can extend this
export interface FormBuilderQuery {
  name?: string;
  createdBy?: string;
  componentType: string;
  tenantId: string;
}

export class idDto {
  @Validate(IsObjectId)
  id: string;
}
