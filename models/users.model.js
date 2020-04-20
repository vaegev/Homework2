import sequelize from '../config';
import crypto from 'crypto';

import { Sequelize, Model, DataTypes } from 'sequelize';

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
        allowNull: false
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
    modelName: 'users'
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

export default Users;
