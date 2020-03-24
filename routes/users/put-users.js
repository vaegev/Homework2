import userService from '../../services/users.service';

const updateUsers = async (req, res, next) => {
    try {
        const newUser = await userService.update(req.body, req.params.id);
        res.json(newUser);
    } catch (e) {
        next(e);
    }
};
module.exports = updateUsers;
