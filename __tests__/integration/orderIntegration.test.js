const request = require('supertest');
const { MongoClient, ObjectId } = require('mongodb');
const app = require('../../src/app');

const url = "mongodb+srv://Nyssa:Hassina@cluster0.uxi6e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'TestsJS';
let server;

describe('Order Creation and Member Association Integration Tests', () => {
    let memberId;
    let client;
    let db;

    beforeAll(async () => {
        console.log('Connecting to MongoDB...')
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(dbName);

        const memberData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/register')
            .send(memberData);

        memberId = response.body.memberId;

        server = app.listen(0);
    });

    afterAll(async () => {
        await db.collection('members').deleteMany({});
        await db.collection('orders').deleteMany({});
        await client.close();
        server.close();
    });

    describe('POST /orders', () => {
        it('devrait créer une commande et l\'associer au membre', async () => {
            const orderData = {
                memberId: memberId,
                items: [
                    { productId: '1', quantity: 2 },
                    { productId: '2', quantity: 1 }
                ],
                totalPrice: 50
            };

            const response = await request(app)
                .post('/orders')
                .send(orderData)
                .expect(201);

            expect(response.body).toHaveProperty('orderId');
            expect(response.body).toHaveProperty('message', 'Commande créée avec succès');

            const orderId = response.body.orderId;
            const fetchedOrder = await db.collection('orders').findOne({ _id: new ObjectId(orderId), memberId: new ObjectId(memberId) });
            expect(fetchedOrder).toBeDefined();
            expect(fetchedOrder.items.length).toBe(2);
            expect(fetchedOrder.totalPrice).toBe(50);
        });
    });
});
