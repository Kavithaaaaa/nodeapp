import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(id: string, args: ValidationArguments) {
    const ObjectId = Types.ObjectId;
    // for async validations you must return a Promise<boolean> here
    // return text.length > 1 && text.length < 10;

    return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'The value should be an ObjectId';
  }
}
