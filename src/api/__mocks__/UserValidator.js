export const mockValidate = jest.fn();

const mockValidator = jest.fn().mockImplementation(() => ({
    validate: mockValidate
  }));

export default mockValidator;
