export const mockValidate = jest.fn();
export const mockValidateForDelete = jest.fn();

const mockValidator = jest.fn().mockImplementation(() => {
  return {
    validate: mockValidate,
    validateForDelete: mockValidateForDelete
  }
});

export default mockValidator;
