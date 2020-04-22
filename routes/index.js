const routes = [
    { route: '/users', path: './users' }
];
module.exports = (app) => routes.map(value => app.use(value.route, require(value.path)));
