import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

class UserService {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return Promise.resolve(this.users);
  }

  getAutoSuggestUsers(loginSubstring, limit) {
    const sugestedUsers = this.users.filter(val => val.login.match(new RegExp(`${loginSubstring}`)));
    
    if (sugestedUsers && sugestedUsers.length > 0) {
      return Promise.resolve(sugestedUsers.slice(0, limit));
    }
    return Promise.reject();
  }
  getUserById(id) {
    let user = this.users.find(val => !val.isDeleted && val.id === id);
    user = user ? { ...user } : null;
    return user
      ? delete user.password && delete user.isDeleted && Promise.resolve(user)
      : Promise.reject("not found");
  }

  create(data) {
    const id = uuidv4();
    const password = crypto
      .createHmac("sha256", id)
      .update(data.password)
      .digest("hex");
    const user = {
      ...data,
      id,
      password,
      isDeleted: false
    };
    this.users.push({ ...user });
    delete user.password;
    return Promise.resolve(user);
  }

  update(data, id) {
    let updated;
    this.users = this.users.map(val => {
      if (id === val.id) {
        updated = {
          ...val,
          ...data,
          password: crypto
            .createHmac("sha256", val.id)
            .update(data.password)
            .digest("hex")
        };
        return updated;
      } else {
        return val;
      }
    });
    return updated ? Promise.resolve() : Promise.reject("not found");
  }

  delete(id) {
    let status = false;
    this.users = this.users.map(val => val.id === id ? status = true && { ...val, isDeleted: true } : val);
    return status ? Promise.resolve() : Promise.reject();
  }
}

module.exports = new UserService();
