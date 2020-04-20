import UsersService from '../../services/users.service';

const getUsers = async (req, res, next) => {
    try {
        const users = await UsersService.getAllUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
};
module.exports = getUsers;
