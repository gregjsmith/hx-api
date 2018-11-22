/* eslint-disable import/named, object-curly-newline, no-undef */

import UserValidator from '../UserValidator';

describe('UserValidator', () => {
  describe('when saving a user', () => {
    test('should validate empty givenName', () => {
      const validator = new UserValidator();

      const user = {
        givenName: '',
        familyName: 'Family',
        age: 34,
        email: 'test@test.com',
      };

      const result = validator.validate(user);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].field).toBe('givenName');
      expect(result.errors[0].message).toContain('field length must be greater than or equal to 1 characters');
    });

    test('should validate empty familyName', () => {
      const validator = new UserValidator();
      const user = {
        givenName: 'Given',
        familyName: '',
        age: 34,
        email: 'test@test.com'
      };

      const result = validator.validate(user);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].field).toBe('familyName');
      expect(result.errors[0].message).toContain('field length must be greater than or equal to 1 characters');
    });

    test('should validate undefined age', () => {
      const validator = new UserValidator();
      const user = { givenName: 'Given', familyName: 'Family', email: 'test@test.com' };

      const result = validator.validate(user);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].field).toBe('age');
      expect(result.errors[0].message).toContain('is required');
    });

    test('should validate empty email address', () => {
      const validator = new UserValidator();
      const user = { givenName: 'Given', familyName: 'Family', age: 34, email: '' };

      const result = validator.validate(user);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].field).toBe('email');
      expect(result.errors[0].message).toContain('must be a valid e-mail');
    });

    test('should return no error for a valid user', () => {
      const validator = new UserValidator();
      const user = { givenName: 'Given', familyName: 'Family', age: 34, email: 'test@test.com' };

      const result = validator.validate(user);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });
});
