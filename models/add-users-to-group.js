import sequelize from '../config';
import Groups from './user-group.model';
import Users from './users.model';

export const addUsersToGroup = async (groupId, userIds) => {
    return sequelize.transaction(async (t) => {
        try {
            const group = await Groups.findByPk(groupId, { transaction: t });
            const users = [];
            for (const id of userIds) {
                users.push(await Users.findByPk(id, { transaction: t }));
            }
            await group.addUsers(users);
        } catch (e) {
            throw e;
        }
    });

};
