import Datastore from 'nedb';

class UserDb {
  constructor(dataPath = __dirname + "/data/users.db"){
      this.db = new Datastore({filename: dataPath, autoload: true});
  }

  insert(user){
    return new Promise((resolve, reject) => {
        this.db.insert(user, (e, doc) => {
          if(e){
            reject({message: e.message});
          }
          resolve(doc);
        });
    });
  }

  update(user){
    return new Promise((resolve, reject) => {
        this.db.update({_id: user._id}, user, (e, doc) => {
          if(e){
            reject({message: e.message});
          }
          resolve(user);
        });
    });
  }

  getAll(){
    return new Promise((resolve) => {
      this.db.find({}, (e, docs) => {
        if(e){
          reject({message: e.message});
        }
        resolve(docs);
      })
    });
  }

  getById(id){
    return new Promise((resolve, reject) => {
      this.db.findOne({_id: id}, (e, doc) => {
        if(e){
          reject({message: e.message});
        }

        resolve(doc);
      });
    });
  }

  delete(id){
    return new Promise((resolve, reject) => {
      this.db.remove({_id: id}, {}, (e, numRemoved) => {
        if(e){
          reject({message: e.message});
        }
        resolve(numRemoved);
      })
    });
  }
}

export default UserDb;
