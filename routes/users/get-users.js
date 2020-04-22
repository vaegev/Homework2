import {getAllUsers} from '../../services/users.service';

const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
};
export default getUsers;
