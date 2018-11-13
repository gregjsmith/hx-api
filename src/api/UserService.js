import UserDb from './db/UserDb'
import moment from 'moment';
import UserValidator from './UserValidator';
import ApiError from './ApiError';

class UserService {

  constructor(){
    this.db = new UserDb();
    this.validator = new UserValidator();
  }

  getUsers(){
    return new Promise((resolve, reject) => {
      this.db.getAll()
        .then((users) => {
          resolve(users);
        })
        .catch((e) => {
          reject(new ApiError("Failed to retrieve all users", e));
        });
    });
  }

  saveUser(user){
    let result = this.validator.validate(user);

    if(!result.isValid){
      return new Promise((resolve, reject) => {
        reject(new ApiError('Validation Failed', result.errors));
      });
    }

    if(!user._id){
      user.created = moment().format();
      return new Promise((resolve, reject) => {
        this.db.insert(user)
          .then((user) => {
            resolve(user);
          })
          .catch((e) => {
            reject(new ApiError('Failed to create new user', e));
          });
      });
    } else{
      user.updated = moment().format();
      return new Promise((resolve, reject) => {
        this.db.update(user)
          .then((user) => {
            resolve(user);
          })
          .catch((e) => {
            reject(new ApiError(`Failed to update user with id ${user._id}`, e));
          });
      });
    }
  }

  delete(user){
    let result = this.validator.validateForDelete(user);

    if(!result.isValid){
      return new Promise((resolve, reject) => {
        reject(new ApiError('Validation Failed', result.errors));
      });
    }

    return new Promise((resolve, reject) => {
      this.db.delete(user)
        .then((removed) => {
          resolve({message: `Number of users removed for _id ${user._id}: ${removed}`});
        })
        .catch((e) => {
          reject(new ApiError(`Failed to delete user with id ${user._id}`, e));
        });
    });
  }

  getById(id){
    return new Promise((resolve, reject) => {
      this.db.getById(id)
        .then((user) => {
          resolve(user);
        })
        .catch((e) => {
          reject(new ApiError(`Error when searching for user with id ${id}`, e));
        });
    });
  }
}

export default UserService;
