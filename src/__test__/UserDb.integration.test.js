import fs from 'fs';

import UserDb from '../db/UserDb';
import {testData} from './testData';

const dbFile = './src/db/data/users.test.json';

describe("UserDb", () => {

  afterEach(() => {
    fs.unlink(dbFile, (err) => {
    });
  });

  test("should save an array", () => {
    let db = new UserDb(dbFile);

    db.save(testData.basicTestUser)
      .then(() => {
        return db.getAll()
          .then((users) => {
            expect(users).toEqual(expect.arrayContaining([testData.basicTestUser]));
          });
      });
  });

  test("should be an empty array when nothing is saved", () => {
    let db = new UserDb(dbFile);
    return db.getAll()
              .then((users) => {
                  expect(users).toEqual(expect.arrayContaining([]));
              });
  });

  test("should be able to get a user by id", () => {
    let db = new UserDb(dbFile);
    db.save(testData.basicTestUser);
    db.getAll()
      .then((users) => {
        let user = users[0];

        let userById = db.getById(user.id);

        expect(userById).toMatchObject(user);
      });

  });
  //
  // test("should be able to delete a user by id", () => {
  //   let db = new UserDb(dbFile);
  //   db.save(testData.basicTestUser);
  //   db.getAll()
  //     .then((users) => {
  //       let user = users[0];
  //       user.id = "123456";
  //
  //       db.deleteById(user.id);
  //
  //       let deletedUser = db.getById(user.id);
  //
  //       expect(deletedUser).not.toBeDefined();
  //     });
  //
  // });

  // test("should get an error when trying to delete a user that doesn't exist", () => {
  //   let db = new UserDb(dbFile);
  //
  //   db.deleteById("1234")
  //     .then(() => {})
  //     .catch((e) => {
  //       expect(e.message).toBe("Attempted to delete a user with the id 1234, but this user does not exist");
  //     });
  //
  // });
})
