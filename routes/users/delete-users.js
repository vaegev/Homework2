import UsersService from '../../services/users.service';

const deleteUser = async (req, res, next) => {
    try {
        const user = await UsersService.delete(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
};

module.exports = deleteUser;
