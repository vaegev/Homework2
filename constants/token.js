const token = require('supertest');
const app = require('../app');

module.exports = token(app).post('/auth/login').send({
    login: 'vaegev1',
    password: 'asdffkljfdS5'
});
