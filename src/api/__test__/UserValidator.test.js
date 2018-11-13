import UserValidator from '../UserValidator';

describe("UserValidator", () => {

  describe("when saving a user", () => {
    test("should validate empty givenName", () => {

      let validator = new UserValidator();

      let user = {givenName: "", familyName: "Family", age: 34, email: "test@test.com"};

      let result = validator.validate(user);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].field).toBe("givenName");
      expect(result.errors[0].message).toContain("field length must be greater than or equal to 1 characters");
    });

    test("should validate empty familyName", () => {

      let validator = new UserValidator();
      let user = {givenName: "Given", familyName: "", age: 34,email: "test@test.com"};

      let result = validator.validate(user);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].field).toBe("familyName");
      expect(result.errors[0].message).toContain("field length must be greater than or equal to 1 characters");
    });

    test("should validate undefined age", () => {

      let validator = new UserValidator();
      let user = {givenName: "Given", familyName: "Family", email: "test@test.com"};

      let result = validator.validate(user);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].field).toBe("age");
      expect(result.errors[0].message).toContain("is required");
    });

    test("should validate empty email address", () => {

      let validator = new UserValidator();
      let user = {givenName: "Given", familyName: "Family", age: 34, email: ""};

      let result = validator.validate(user);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].field).toBe("email");
      expect(result.errors[0].message).toContain("must be a valid e-mail");
    });

    test("should return no error for a valid user", () => {

      let validator = new UserValidator();
      let user = {givenName: "Given", familyName: "Family", age: 34, email: "test@test.com"};

      let result = validator.validate(user);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

  });

  describe("when deleting a user", () => {

    test("should check the id is present", () => {
      let validator = new UserValidator();
      let user = {givenName: "Given", familyName: "Family", age: 34, email: "test@test.com"};

      let result = validator.validateForDelete(user);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].field).toBe("_id");
      expect(result.errors[0].message).toContain("is required");

    });

    test("should return no errors when the id is present", () => {
      let validator = new UserValidator();
      let user = {givenName: "Given", familyName: "Family", age: 34, email: "test@test.com", _id: "ldkjfhvd978yh"};

      let result = validator.validateForDelete(user);

      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

  });

});
