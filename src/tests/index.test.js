const db = require('../database');
const supertest = require('supertest');
const app = require('../app');

let identity;

async function resetDataBase() {
    await db.query('DELETE FROM exams');
    await db.query('DELETE FROM professors');
    await db.query('DELETE FROM subjects_exams');
    await db.query('DELETE FROM professor_subject');
    await db.query('DELETE FROM subjects');
}

async function addMiddleTables(id) {
    await db.query('INSERT INTO professor_subject ("subjectId")', [id]);
    await db.query('INSERT INTO subjects_exams ("subjectId")', [id]);
    return id;
}

beforeAll(async () => {
    await resetDataBase();
});

afterAll(async () => {
    await resetDataBase();
    db.end();
});

describe('POST /api/v1/subjects', () => {
    it('should return 201 when the body is correct', async () => {
        const body = {
            name: 'sistemas lineares 1',
            period: 3,
            professorName: 'Jomar'
        };

        const response = await supertest(app).post('/api/v1/subjects').send(body);

        expect(response.status).toBe(201);
    });

    it('should return 422 when the body is invalid', async () => {
        const body = {
            name: 'teoria eletromagnética 2',
            period: '',
            professorName: 'joão silva'
        };

        const response = await supertest(app).post('/api/v1/subjects').send(body);

        expect(response.status).toBe(422);
    });
});

describe('GET /api/v1/subjects', () => {
    it('should return 200 with the correct objects', async () => {
        const response = await supertest(app).get('/api/v1/subjects');

        addMiddleTables(response.body[0].id);
        identity = response.body[0].id;

        expect(response.status).toBe(200);

        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0].count).toHaveProperty('count');
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
    });
});

describe('POST /api/v1/exams', () => {
    it('should return 200 when the body is valid', async () => {
        const body = {
            link: 'https://www.respondeai.com.br/',
            examType: "P3",
            subjectId: identity
        }

        const response = await supertest(app).post('/api/v1/exams').send(body);

        expect(response.status).toBe(201);
    });

    it('should return 422 when the body is invalid', async () => {
        const body = {
            link: 'https://www.respondeai.com.br/',
            examType: "Prova 3",
            subjectId: identity
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
        expect(response.body[0].count).toHaveProperty('count');
        expect(response.body[0]).toHaveProperty('subjectId');
    });
});

describe('GET /api/v1/exams/subject:subject', () => {
    it('should return 200 and the correct body', async () => {
        const response = await supertest(app).get('/api/v1/exams/subject:sistemas lineares 1');

        expect(response.status).toBe(200);

        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('link');
        expect(response.body[0]).toHaveProperty('examType');
    });
});

describe('GET /api/v1/exams/professors:id', () => {
    it('should return 200 and the correct body', async () => {
        const response = await supertest(app).get(`/api/v1/exams/professor:${identity}`);

        expect(response.status).toBe(200);

        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('link');
        expect(response.body[0]).toHaveProperty('examType');
    });
});

describe('POST /api/v1/subject/new-professor', () => {
    it('should return 201 when the body is valid', async () => {
        const body = {
            name: 'sistemas lineares 1',
            professorName: 'Ricardo Lessa'
        };

        const response = await supertest(app).post('/api/v1/subject/new-professor').send(body);

        expect(response.status).toBe(201);
    });

    it('should return 422 when the body is invalid', async () => {
        const body = {
            name: 'sistemas lineares 1',
            professorName: 2
        };

        const response = await supertest(app).post('/api/v1/subject/new-professor').send(body);

        expect(response.status).toBe(422);
    });
});