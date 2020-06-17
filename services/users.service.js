import Users from '../models/users.model';

export const deleteUserById = (id) => {
    return Users.destroy({ where: { id } });
};

export const getAllUsers = () => {
    return Users.findAll();
};

export const save = (body) => {
    return Users.create(body);
};

export const update = (id, body) => {
    return Users.update(body, { where: { id }, returning: true , individualHooks: true});
};

export const findById = (id) => {
    return Users.findByPk(id);
};
