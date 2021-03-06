import sequelize from '../config';
import crypto from 'crypto';

import { Model, Sequelize } from 'sequelize';

class Users extends Model {
}

Users.init({
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return () => this.getDataValue('password');
        }
    },
    age: { type: Sequelize.INTEGER },
    salt: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('salt');
        }
    }
}, {
    sequelize,
    modelName: 'user'
    // options
});
Users.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};
Users.encryptPassword = function (plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex');
};
const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = Users.generateSalt();
        user.password = Users.encryptPassword(user.password(), user.salt());
    }
};
Users.beforeCreate(setSaltAndPassword);
Users.beforeUpdate(setSaltAndPassword);

Users.prototype.validPassword = function (enteredPassword) {
    return Users.encryptPassword(enteredPassword, this.salt()) === this.password();
};

export default Users;
