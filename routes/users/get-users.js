import userService from '../../services/users.service';

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAutoSuggestUsers(
            req.query.loginSubstring,
            req.query.limit
        );
        res.json(users);
    } catch (e) {
        next(e);
    }
};
module.exports = getUsers;
