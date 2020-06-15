const request = require('supertest');
const app = require('./app');

describe('Test the root path', () => {
    test('It should response the GET method', async (done) => {
        try {
            const token = await request(app).post('/auth/login').send({
                login: 'vadhfj',
                password: 'asdffkljfdS5'
            });
            expect(token.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });
});
