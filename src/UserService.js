import uuid from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import UserDb from './db/UserDb'

class UserService {

  constructor(){
    this.db = new UserDb();
  }

  getUsers(){
    return this.db.getAll();
  }

  saveUser(user){

    if (!user.id) {
      user.id = uuid.v4();
      user.created = moment.utc();
      this.db.save(user);
      return {
        user,
        status: "Created"
      }
    }
    let existingUser = this.db.getById(user.id);

    if (existingUser) {
      let updatedUser = Object.assign({}, existingUser, user);
      this.db.save(updatedUser);
      return {
        user: updatedUser,
        status: "Updated"
      }
    }else{
        throw new Error(`Cannot Update user with id ${user.id} - this user does not exist`)
    }
  }

  deleteUser(id){

  }
}

export default UserService;
