import sequelize from '../config';
import { Model, Sequelize, DataTypes } from 'sequelize';
import Users from './users.model';
import PERMISSIONS from '../constants/permissions';

class Groups extends Model {
}

Groups.init({
    name: DataTypes.STRING,
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM({ values: PERMISSIONS }))
    }
}, { sequelize, modelName: 'group' });

Groups.belongsToMany(Users, { through: 'UserGroup' });
Users.belongsToMany(Groups, { through: 'UserGroup' });

export default Groups;
