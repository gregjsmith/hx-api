export const mockSave = jest.fn();
export const mockGetAll = jest.fn();
export const mockGetById = jest.fn();

const mockDb = jest.fn().mockImplementation(() => {
  return {
    save: mockSave,
    getAll: mockGetAll,
    getById: mockGetById
  }
});


export default mockDb;
