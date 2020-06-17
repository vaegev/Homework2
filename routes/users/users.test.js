const request = require('supertest');
const app = require('../../app');
const Token = require('../../constants/token');

describe('Test the users path', () => {
    test('It should response the GET method to get the users', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).get('/users').set('Authorization', token.body.token);
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });

    test('It should response the GET method to get the user data with id 1', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).get('/users/1').set('Authorization', token.body.token);
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });

    test('It should response the POST method to create a user', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).post('/users').set('Authorization', token.body.token).send({
                firstName: 'Vahe',
                lastName: 'Gevorgyan',
                login: `random${ Math.random() }`,
                age: 25,
                password: 'asdffkljfdS5'
            });
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });

    test('It should response the POST method to create a user FAILURE', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).post('/users').set('Authorization', token.body.token).send({
                firstName: 'Vahe',
                lastName: 'Gevorgyan',
                login: 'vaegev1',
                age: 25,
                password: 'asdffkljfdS5'
            });
            expect(res.status).toBe(400);
            done();
        } catch (e) {
            done(e);
        }
    });

    test('It should response the PUT method to update a user', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).put('/users/5').set('Authorization', token.body.token).send({
                firstName: 'Test',
                lastName: 'Test',
                login: `${ Math.random() }`,
                age: 25,
                password: 'asdffkljfdS5'
            });
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });

    test('It should response the DELETE method to delete a user', async (done) => {
        try {
            const token = await Token;
            const allUsers = await request(app).get('/users').set('Authorization', token.body.token);
            const lastUserId = allUsers.body.map(val => val.id).reduce((a, b) => Math.max(a, b));
            const res = await request(app).delete(`/users/${ lastUserId }`).set('Authorization', token.body.token);
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });

    test('It should response the DELETE method to delete a user FAILURE', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).delete(`/users/${ Math.random() }`).set('Authorization', token.body.token);
            expect(res.status).toBe(400);
            done();
        } catch (e) {
            done(e);
        }
    });
});
