const request = require('supertest');
const app = require('../../app');

describe('Test the root path', () => {
    test('It should response the GET method', async (done) => {
        try {
            const token = await request(app).post('/auth/login').send({
                login: 'vadhfj',
                password: 'asdffkljfdS5'
            });

            const res = await request(app).get('/groups').set('Authorization', token.body.token);
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });
});
