export const mockValidate = jest.fn();

const mockValidator = jest.fn().mockImplementation(() => {
  return {
    validate: mockValidate
  }
});

export default mockValidator;
