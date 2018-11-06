import UserService from '../UserService';
import UserDb, {mockSave, mockGetAll, mockGetById} from '../db/UserDb';
import {testData} from './testData';

jest.mock('../db/UserDb');

describe("UserService", () => {

  beforeEach(()=> {
    UserDb.mockClear();
    mockSave.mockReset();
    mockGetAll.mockReset();
    mockGetById.mockReset();
  });

  afterEach(()=> {
  });

  test("should return users from the Db", () => {
    const service = new UserService();

    mockGetAll.mockReturnValue([{givenName: "Greg", familyName: "Smith"}]);
    let users = service.getUsers();

    expect(UserDb).toHaveBeenCalledTimes(1);
    expect(mockGetAll).toHaveBeenCalledTimes(1);
    expect(users.length).toBe(1);
  });

  test("should save a new user", () => {
    const service = new UserService();
    mockGetAll.mockReturnValue([]);

    const user = {
      givenName: "John",
      familyName: "Jones",
      age: 47
    }

    let resp = service.saveUser(user);

    expect(UserDb).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(resp.status).toBe("Created");
    expect(resp.user).toMatchObject(user);
    expect(resp.user.id).toBeDefined();
    expect(resp.user.created).toBeDefined();
  });

  test("should update an existing user", () => {
    const service = new UserService();
    mockGetById.mockReturnValue({givenName: "Barry", familyName: "White", id: "123456"});

    const user = {
      givenName: "Barry",
      familyName: "Blue",
      id: "123456"
    }

    let resp = service.saveUser(user);

    expect(UserDb).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith(user);
    expect(resp.status).toBe("Updated");
    expect(resp.user).toMatchObject(user);

  });

  test("should error when attempting to save an account with an ID that doesn't already exist", () => {
    const service = new UserService();
    let user = testData.basicTestUser;
    user.id = "123123";

    try {
      let resp = service.saveUser(user);
      throw new Error("The test shouldn't have got this far...")
    } catch (e){
      expect(e.message).toBe("Cannot Update user with id 123123 - this user does not exist");
    }

  });

});
