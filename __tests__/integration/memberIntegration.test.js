const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../src/app');

const url = "mongodb+srv://Nyssa:Hassina@cluster0.uxi6e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'TestsJS';
let server;

describe('Member Registration and Database Save Integration Tests', () => {
    let client;
    let db;

    beforeAll(async () => {
        console.log('Connecting to MongoDB...')
        client = await MongoClient.connect(url);
        db = client.db(dbName);
        server = app.listen(0);
    });

    afterAll(async () => {
        await client.close();
        server.close();
    });

    beforeEach(async () => {
        await db.collection('members').deleteMany({});
    });

    it('devrait enregistrer un nouveau membre avec des données valides', async () => {
        const memberData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/register')
            .send(memberData)
            .expect(201);

        expect(response.body).toHaveProperty('memberId');
    });

    it('devrait rejeter une inscription avec des données manquantes', async () => {
        const memberData = {
            firstName: 'John',
        };

        const response = await request(app)
            .post('/register')
            .send(memberData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
    });
});
