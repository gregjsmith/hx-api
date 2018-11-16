export const mockInsert = jest.fn();
export const mockUpdate = jest.fn();
export const mockDelete = jest.fn();
export const mockGetAll = jest.fn();
export const mockGetById = jest.fn();

const mockDb = jest.fn().mockImplementation(() => ({
  insert: mockInsert,
  update: mockUpdate,
  delete: mockDelete,
  getAll: mockGetAll,
  getById: mockGetById
}));


export default mockDb;
