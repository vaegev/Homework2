const routes = [
    { route: '/users', path: './users' },
    { route: '/groups', path: './user-groups' },
];
module.exports = (app) => routes.map(value => app.use(value.route, require(value.path)));
