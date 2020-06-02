import passport from '../services/auth.service';

const routes = [
    { route: '/users', path: './users' },
    { route: '/groups', path: './user-groups' }
];
module.exports = (app) => routes.map(value => app.use(value.route, passport.authenticate('jwt', { session: false }), require(value.path)));
