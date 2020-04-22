import { save } from '../../services/users.service';

const postUser = async (req, res, next) => {
    try {
        const newUser = await save(req.body);
        res.json(newUser);
    } catch (e) {
        return next(e);
    }
};

export default postUser;
