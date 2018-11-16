import Validator from 'fastest-validator';

const processValidationResult = (result) => {
  let errors = [];
  let isValid = true;

  if (result !== true) {
    errors = result;
    isValid = false;
  }
  return { errors, isValid };
}

class UserValidator {
  validate(user) {
    const validator = new Validator();

    const schema = {
      givenName: { type: 'string', min: 1, max: 255 },
      familyName: { type: 'string', min: 1, max: 255 },
      age: { type: 'number' },
      email: { type: 'email' }
    };

    const check = validator.compile(schema);

    const result = check(user);

    return processValidationResult(result);
  }
}

export default UserValidator;
