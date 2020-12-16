const db = require('../database');
const supertest = require('supertest');
const app = require('../app');

describe('GET /api/v1/subjects', () => {
    it('should return 200 with the correct objects', async () => {
        const response = await supertest(app).get('/api/v1/subjects');

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('period');
    });
});

describe('POST /api/v1/subjects/professor', () => {
    it('should return 200 with the correct objects', async () => {
        const body = { name: 'sistemas lineares 1' };

        const response = await supertest(app).post('/api/v1/subjects/professor').send(body);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('name');
    });

    it('should return 422 when the body is invalid', async () => {
        const body = { name: '' };

        const response = await supertest(app).post('/api/v1/subjects/professor').send(body);

        expect(response.status).toBe(422);
    })
});