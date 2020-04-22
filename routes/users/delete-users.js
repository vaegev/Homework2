import { deleteUserById } from '../../services/users.service';

const deleteUser = async (req, res, next) => {
    try {
        const user = await deleteUserById(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
};

export default deleteUser;
