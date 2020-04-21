import Users from '../models/users.model';

class UsersService {
    delete(id) {
        return Users.destroy({ where: { id } });
    }

    getAllUsers() {
        return Users.findAll();
    }

    save(body) {
        return Users.create(body);
    }

    update(id, body) {
        return Users.update(body, { where: { id }, returning: true });
    }

    findById(id) {
        return Users.findByPk(id);
    }
}

export default new UsersService();
