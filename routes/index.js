import { JWTMiddleware } from '../services/auth.service';

const routes = [
    { route: '/users', path: './users' },
    { route: '/groups', path: './user-groups' }
];
module.exports = (app) => routes.map(value => app.use(value.route, JWTMiddleware, require(value.path)));
