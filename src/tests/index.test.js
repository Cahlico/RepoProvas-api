const db = require('../database');
const supertest = require('supertest');
const app = require('../app');

async function resetDataBase() {
    await db.query('DELETE FROM exams');
}

beforeAll(async () => {
    resetDataBase();
});

afterAll(async () => {
    resetDataBase();
    db.end();
});

describe('GET /api/v1/subjects', () => {
    it('should return 200 with the correct objects', async () => {
        const response = await supertest(app).get('/api/v1/subjects');

        expect(response.status).toBe(200);

        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('period');
    });
});

describe('POST /api/v1/subjects/professor', () => {
    it('should return 200 with the correct objects', async () => {
        const body = { name: 'sistemas lineares 1' };

        const response = await supertest(app).post('/api/v1/subjects/professor').send(body);

        expect(response.status).toBe(200);

        expect(response.body[0]).toHaveProperty('name');
    });

    it('should return 422 when the body is invalid', async () => {
        const body = { name: '' };

        const response = await supertest(app).post('/api/v1/subjects/professor').send(body);

        expect(response.status).toBe(422);
    })
});

describe('POST /api/v1/exams', () => {
    it('should return 200 when the body is valid', async () => {
        const body = {
            link: 'https://www.respondeai.com.br/',
            examType: "P3",
            subjectId: 15
        }

        const response = await supertest(app).post('/api/v1/exams').send(body);

        expect(response.status).toBe(200);
    });

    it('should return 422 when the body is invalid', async () => {
        const body = {
            link: 'https://www.respondeai.com.br/',
            examType: "Prova 3",
            subjectId: 15
        }

        const response = await supertest(app).post('/api/v1/exams').send(body);

        expect(response.status).toBe(422);
    });
});

describe('GET /api/v1/professors', () => {
    it('should return 200 with the correct body', async () => {
        const response = await supertest(app).get('/api/v1/professors');

        expect(response.status).toBe(200);

        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('subjectId');
    })
})