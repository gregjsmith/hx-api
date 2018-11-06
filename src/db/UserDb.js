import fs from 'fs';

class UserDb {
  constructor(dbFile = "./src/db/data/users.json"){
      this.dbFile = dbFile;
  }

  save(user){
    return new Promise((resolve, reject) => {
      this.getAll()
        .then((users) => {
            users.push(user);
            let dataToWrite = JSON.stringify(users);
            fs.writeFileSync(this.dbFile, dataToWrite);
            resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });

  }

  getAll(){
    return new Promise((resolve) => {
      if (!fs.existsSync(this.dbFile)) {
        resolve([]);
      }

      let file = fs.readFileSync(this.dbFile);
      let contents = JSON.parse(file);
      resolve(contents);
    });
  }

  getById(id){
    this.getAll()
      .then((users) => {
        let existingUser;

        users.find((user) => {
          if(user.id === id){
            existingUser = user;
          };
        });

        return existingUser;
      });
  }

  deleteById(id){
    return new Promise((resolve, reject) => {
      this.getAll()
        .then((users) => {
          if(users.length === 0){
              throw new Error(`Attempted to delete a user with the id ${id}, but this user does not exist`)
          }

          var filtered = users.filter((user, idx) => {
            return user.id !== id;
          });

          let dataToWrite = JSON.stringify(users);
          fs.writeFileSync(this.dbFile, dataToWrite);
          resolve();
        });
    });
  }
}

export default UserDb;
