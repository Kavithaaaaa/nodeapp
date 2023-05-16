import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsStringArray implements ValidatorConstraintInterface {
  validate(id: string, args: ValidationArguments) {
    if (id) {
      const { constraints } = args;
      const convertToArray = id.split(',');
      const filterResult = convertToArray
        .filter((i) => {
          return !constraints.includes(i.trim());
        })
        .map((i) => i.trim());

      return filterResult.length ? false : true;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { constraints, property } = args;
    return 'The ' + property + ' should be one of ' + constraints.join(', ');
  }
}
