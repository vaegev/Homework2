import userService from '../../services/users.service';

const getUsers = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (e) {
        next(e);
    }
};

module.exports = getUsers;
