// import fs from 'fs';
// import UserDb from '../db/UserDb';
//
// const dataPath = './src/db/data/test/users.db';
//
// describe("UserDb", () => {
//
//   afterEach(() => {
//     if(fs.existsSync(dataPath)){
//       fs.unlinkSync(dataPath);
//     }
//   });
//
//   test("should be able to store a user", () => {
//     let db = new UserDb(dataPath);
//
//     return db.save({givenName: "John", familyName: "Smith", age: 34})
//       .then((user) => {
//           expect(user.givenName).toBe("John");
//           expect(user._id).toBeDefined();
//           expect(user.created).toBeDefined();
//       });
//   });
//
//   test("should be able to retrieve a user", () => {
//     let db = new UserDb(dataPath);
//
//     return db.save({givenName: "John", familyName: "Smith", age: 34})
//       .then((user) => {
//           db.getById(user._id)
//             .then((user) => {
//               expect(user.givenName).toBe("John");
//             });
//       });
//
//   });
//
//   test("should be able to update a user", () => {
//     let db = new UserDb(dataPath);
//     let id;
//
//     return db.save({givenName: "John", familyName: "Smith", age: 34})
//       .then((user) => {
//           user.givenName = "James";
//           id = user._id;
//           db.save(user)
//             .then((user) => {
//               expect(user.givenName).toBe("James");
//               expect(user._id).toBe(id);
//               expect(user.updated).toBeDefined();
//             });
//       });
//   });
//
//   test("should be able to delete a user", () => {
//     let db = new UserDb(dataPath);
//
//     return db.save({givenName: "John", familyName: "Smith", age: 34})
//       .then((user) => {
//           db.delete(user)
//             .then((resp) => {
//               expect(resp).toBe(1);
//             });
//       });
//   });
//
//   test("should be able to retrieve all documents", ()=>{
//     let db = new UserDb(dataPath);
//
//     return db.save({givenName: "John", familyName: "Smith", age: 34})
//       .then((user) => {
//           db.save({givenName: "John", familyName: "Smith", age: 35})
//             .then((user) => {
//                 db.getAll()
//                   .then((users) => {
//                     expect(users.length).toBe(2);
//                   });
//             });
//       });
//   });
// });
