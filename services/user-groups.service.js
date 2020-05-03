import Groups from '../models/user-group.model';

export const getGroupById = (id) => {
    return Groups.findByPk(id);
};

export const getAllGroups = () => {
    return Groups.findAll();
};

export const createGroup = (body) => {
    return Groups.create(body);
};

export const updateGroup = (id, body) => {
    return Groups.update(body, { where: { id }, returning: true });
};

export const removeGroup = (id) => {
    return Groups.destroy({ where: { id } });
};
