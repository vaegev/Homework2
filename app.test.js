const request = require('supertest');
const app = require('./app');
const Token = require('./constants/token');

describe('Test the auth path', () => {
    test('It should response the POST method', async (done) => {
        try {
            const token = await Token;
            expect(token.status).toBe(200);
            expect(token.body).toHaveProperty('token');
            done();
        } catch (e) {
            done(e);
        }
    });
    test('It should response the POST method', async (done) => {
        try {
            const token = await request(app).post('/auth/login').send({
                login: 'vaegev1',
                password: 'asdffkljfdS'
            });
            expect(token.status).toBe(400);
            done();
        } catch (e) {
            done(e);
        }
    });
});
