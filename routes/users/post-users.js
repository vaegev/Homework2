import userService from '../../services/users.service';

const postUser = async (req, res, next) => {
    try {
        const newUser = await userService.create(req.body);
        res.json(newUser);
    } catch (e) {
        next(e);
    }
};

module.exports = postUser;
