import sequelize from '../config';
import { Transaction } from 'sequelize';
import Groups from './user-group.model';
import Users from './users.model';

export const executeTransaction = (callBack) => {
    return sequelize().transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
    }, (t) => callBack(t));
};

export const addUsersToGroup = async (groupId, userIds) => {
    try {
        const group = await Groups.findByPk(groupId);
        const users = [];
        for (const id of userIds) {
            users.push(await Users.findByPk(id));
        }
        return await group.addUsers(users);
    } catch (e) {
        throw e;
    }
};
