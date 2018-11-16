import Validator from 'fastest-validator';

let processValidationResult = (result) => {
  let errors = [];
  let isValid = true;

  if(result !== true){
      errors = result;
      isValid = false;
  }
  return {errors, isValid};
}

class UserValidator {
  validate(user){
    const validator = new Validator();

    let schema = {
        givenName: { type: "string", min: 1, max: 255 },
        familyName: { type: "string", min: 1, max: 255 },
        age: { type: "number"},
        email: { type: "email"}
    };

    let check = validator.compile(schema);

    let result = check(user);

    return processValidationResult(result);
  }
}

export default UserValidator;
