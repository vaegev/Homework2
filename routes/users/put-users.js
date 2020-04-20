import UsersService from '../../services/users.service';

const updateUsers = async (req, res, next) => {
    try {
        const newUser = await UsersService.update(req.params.id, req.body);
        res.json(newUser[1][0]);
    } catch (e) {
        next(e);
    }
};
module.exports = updateUsers;
