import UsersService from '../../services/users.service';

const postUser = async (req, res, next) => {
    try {
        const newUser = await UsersService.save(req.body);
        res.json(newUser);
    } catch (e) {
        return next(e);
    }
};

module.exports = postUser;
