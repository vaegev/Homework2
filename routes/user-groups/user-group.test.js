const request = require('supertest');
const app = require('../../app');
const Token = require('../../constants/token');

describe('Test the group path', () => {
    test('It should response the GET method', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).get('/groups').set('Authorization', token.body.token);
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });
    test('It should response the POST method', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).post('/groups').set('Authorization', token.body.token).send({
                name: `random${ Math.random() }`,
                permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
            });
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });
    test('It should response the POST method FAILURE', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).post('/groups').set('Authorization', token.body.token).send({
                name: 'admin',
                permissions: ['kuku']
            });
            expect(res.status).toBe(400);
            done();
        } catch (e) {
            done(e);
        }
    });
    test('It should response the PUT method', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).put('/groups/4').set('Authorization', token.body.token).send({
                name: 'admin',
                permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
            });
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });
    test('It should response the POST method', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).post('/groups/4').set('Authorization', token.body.token).send({
                userIds: [1]
            });
            expect(res.status).toBe(200);
            done();
        } catch (e) {
            done(e);
        }
    });
    test('It should response the POST method FAILURE', async (done) => {
        try {
            const token = await Token;
            const res = await request(app).post('/groups/4').set('Authorization', token.body.token).send({
                userIds: [Math.random()]
            });
            expect(res.status).toBe(400);
            done();
        } catch (e) {
            done(e);
        }
    });
});
