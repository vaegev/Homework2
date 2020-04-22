import { findById } from '../../services/users.service';

const getUsers = async (req, res, next) => {
    try {
        const user = await findById(req.params.id);
        res.json(user);
    } catch (e) {
        next(e);
    }
};

export default getUsers;
