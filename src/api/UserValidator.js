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
  constructor(){
    this.validator = new Validator();
  }

  validate(user){
    let schema = {
        givenName: { type: "string", min: 1, max: 255 },
        familyName: { type: "string", min: 1, max: 255 },
        age: { type: "number"},
        email: { type: "email"}
    };

    let check = this.validator.compile(schema);

    let result = check(user);

    return processValidationResult(result);
  }

  validateForDelete(user){
    let schema = {
        _id: { type: "string", min: 1, max: 255 },
    };

    let check = this.validator.compile(schema);

    let result = check(user);

    return processValidationResult(result);
  }
}

export default UserValidator;
