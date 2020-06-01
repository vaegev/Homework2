import sequelize from '../config';
import { DataTypes, Model } from 'sequelize';
import Users from './users.model';
import PERMISSIONS from '../constants/permissions';

class Groups extends Model {
}

Groups.init({
    name: { type: DataTypes.STRING, allowNull: false },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM({ values: PERMISSIONS })),
        allowNull: false
    }
}, { sequelize, modelName: 'group' });

Groups.belongsToMany(Users, { through: 'UserGroup', onDelete: 'CASCADE' });
Users.belongsToMany(Groups, { through: 'UserGroup', onDelete: 'CASCADE' });

export default Groups;
