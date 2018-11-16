import UserService from '../UserService';
import UserDb, {mockInsert, mockUpdate, mockDelete, mockGetAll, mockGetById} from '../db/UserDb';
import UserValidator, {mockValidate} from '../UserValidator';
import ApiError from '../ApiError';

jest.mock('../db/UserDb');
jest.mock('../UserValidator');

describe("UserService", () => {

  beforeEach(()=> {
    UserDb.mockClear();
    mockInsert.mockReset();
    mockUpdate.mockReset();
    mockDelete.mockReset();
    mockGetAll.mockReset();
    mockGetById.mockReset();

    UserValidator.mockClear();
    mockValidate.mockReset();
  });

  afterEach(()=> {
  });

  describe("when getting all users", () => {

    test("should return all users from the database", () => {
      const service = new UserService();

      mockGetAll.mockReturnValue(new Promise((resolve) => {
        resolve([{givenName: "John"}]);
      }));

      return service.getUsers()
        .then((users) => {
          expect(UserDb).toHaveBeenCalledTimes(1);
          expect(mockGetAll).toHaveBeenCalledTimes(1);
          expect(users.length).toBe(1);
        });
    });

    test("should return ApiError if the call to db fails", () => {
      const service = new UserService();

      mockGetAll.mockReturnValue(new Promise((resolve, reject) => {
        reject(new Error("Something bad happened"));
      }));

      return service.getUsers()
        .catch((e) => {
          expect(e instanceof ApiError).toBe(true);
          expect(e.message).toContain('Failed to retrieve all users');
          expect(mockGetAll).toHaveBeenCalledTimes(1);
        });
    });

  });

  describe("when getting a user by id", () => {

    test("should call database for relevant user id", () => {
      const service = new UserService();

      mockGetById.mockReturnValue(new Promise((resolve) => {
        resolve([{givenName: "John"}]);
      }));

      return service.getById("123123")
        .then((user) => {
          expect(UserDb).toHaveBeenCalledTimes(1);
          expect(mockGetById).toHaveBeenCalledTimes(1);
          expect(mockGetById).toBeCalledWith("123123");
        });
    });

    test("should return ApiError if the call to db fails", () => {
      const service = new UserService();

      mockGetById.mockReturnValue(new Promise((resolve, reject) => {
        reject(new Error("Something bad happened"));
      }));

      return service.getById("123123")
        .catch((e) => {
          expect(e instanceof ApiError).toBe(true);
          expect(e.message).toContain('Error when searching for user with id 123123');
          expect(mockGetById).toHaveBeenCalledTimes(1);
        });
    });

  });

  describe("When saving a user", () => {
    test("user details should be validated", () => {
      const service = new UserService();

      mockValidate.mockReturnValue({errors: [], isValid: true});

      mockInsert.mockReturnValue(new Promise((resolve)=> {
          resolve({givenName: "John"});
      }));

      return service.saveUser({givenName: "John"})
        .then((user) => {
          expect(mockValidate).toHaveBeenCalledTimes(1);
        });
    });

    test("should throw ApiError if user details invalid", () => {
      const service = new UserService();

      mockValidate.mockReturnValue({errors: [], isValid: false});

      return service.saveUser({givenName: "John"})
        .catch((e) => {
          expect(mockValidate).toHaveBeenCalledTimes(1);
          expect(e instanceof ApiError).toBe(true);
          expect(e.message).toContain('Validation Failed');
          expect(mockInsert).toHaveBeenCalledTimes(0);
        });
    });

    test("should insert to database if details valid and no _id exists", () => {
      const service = new UserService();

      mockValidate.mockReturnValue({errors: [], isValid: true});

      mockInsert.mockReturnValue(new Promise((resolve)=> {
          resolve({givenName: "John"});
      }));

      return service.saveUser({givenName: "John"})
        .then((resp) => {
          expect(mockValidate).toHaveBeenCalledTimes(1);
          expect(mockInsert).toHaveBeenCalledTimes(1);
          expect(mockUpdate).toHaveBeenCalledTimes(0);
          expect(resp.status).toBe('created');
        });
    });

    test("should throw ApiError if insert to database fails", () => {
      const service = new UserService();

      mockValidate.mockReturnValue({errors: [], isValid: true});

      mockInsert.mockReturnValue(new Promise((resolve, reject)=> {
          reject(new Error("Bad stuff happened"));
      }));

      return service.saveUser({givenName: "John"})
        .catch((e) => {
          expect(mockValidate).toHaveBeenCalledTimes(1);
          expect(mockInsert).toHaveBeenCalledTimes(1);
          expect(e instanceof ApiError).toBe(true);
          expect(e.message).toContain('Failed to create new user');
        });
    });

    test("should update to database if details valid and an _id exists", () => {
      const service = new UserService();
      let john = {givenName: "John", _id: "123123"};

      mockValidate.mockReturnValue({errors: [], isValid: true});

      mockUpdate.mockReturnValue(new Promise((resolve)=> {
          resolve(john);
      }));

      return service.saveUser(john)
        .then((resp) => {
          expect(mockValidate).toHaveBeenCalledTimes(1);
          expect(mockUpdate).toHaveBeenCalledTimes(1);
          expect(resp.status).toBe('updated');
        });
    });

    test("should throw ApiError if update to database fails", () => {
      const service = new UserService();
      let john = {givenName: "John", _id: "123123"};

      mockValidate.mockReturnValue({errors: [], isValid: true});

      mockUpdate.mockReturnValue(new Promise((resolve, reject)=> {
          reject(new Error("Bad stuff happened"));
      }));

      return service.saveUser(john)
        .catch((e) => {
          expect(mockValidate).toHaveBeenCalledTimes(1);
          expect(mockUpdate).toHaveBeenCalledTimes(1);
          expect(e instanceof ApiError).toBe(true);
          expect(e.message).toContain('Failed to update user with id 123123');
        });
    });

  });

  describe("When deleting a user", () => {

    test("should throw ApiError if no id is provided", () => {
      const service = new UserService();

      return service.delete()
        .catch((e) => {
          expect(e instanceof ApiError).toBe(true);
          expect(e.message).toContain('Mandatory parameter id was not provided');
          expect(mockDelete).toHaveBeenCalledTimes(0);
        });
    });

    test("should delete from database if details valid", () => {
      const service = new UserService();

      mockDelete.mockReturnValue(new Promise((resolve)=> {
          resolve({message: "Success"});
      }));

      return service.delete("123123")
        .then((response) => {
          expect(mockDelete).toHaveBeenCalledTimes(1);
        });
    });

    test("should throw ApiError if delete from database fails", () => {
      const service = new UserService();

      mockDelete.mockReturnValue(new Promise((resolve, reject)=> {
          reject(new Error("Bad stuff happened"));
      }));

      return service.delete("123123")
        .catch((e) => {
          expect(mockDelete).toHaveBeenCalledTimes(1);
          expect(e instanceof ApiError).toBe(true);
          expect(e.message).toContain('Failed to delete user with id 123123');
        });
    });

  });



});
