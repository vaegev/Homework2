import { update } from '../../services/users.service';

const updateUsers = async (req, res, next) => {
    try {
        const newUser = await update(req.params.id, req.body);
        res.json(newUser[1][0]);
    } catch (e) {
        next(e);
    }
};
export default updateUsers;
