const request = require('supertest');
const app = require('./app');
// const db = require('./config');

describe('Test the root path', () => {
    // beforeAll(async () => {
    //     await db.authenticate();
    //     await db.sync();
    // });
    //
    // afterAll(() => {
    //     db.close();
    // });
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
