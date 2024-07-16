const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(bodyParser.json());

const url = "mongodb+srv://Nyssa:Hassina@cluster0.uxi6e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'TestsJS';
let db;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(dbName);
    } catch (err) {
        console.error('Erreur de connexion à MongoDB :', err);
        throw err;
    }
}

connectToDatabase().catch(err => {
    console.error('Erreur de démarrage :', err);
    process.exit(1);
});

app.use((req, res, next) => {
    if (!db) {
        return res.status(500).json({ error: 'Connexion à la base de données non établie' });
    }
    next();
});

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existingMember = await db.collection('members').findOne({ email });
        if (existingMember) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        const result = await db.collection('members').insertOne({ firstName, lastName, email, password });
        const memberId = result.insertedId;

        res.status(201).json({ memberId, message: 'Membre enregistré avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'inscription du membre :', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/orders', async (req, res) => {
    const { memberId, items, totalPrice } = req.body;

    try {
        const existingMember = await db.collection('members').findOne({ _id: new ObjectId(memberId) });
        if (!existingMember) {
            return res.status(400).json({ error: 'Membre non trouvé' });
        }

        const result = await db.collection('orders').insertOne({ memberId: new ObjectId(memberId), items, totalPrice });
        const orderId = result.insertedId;

        res.status(201).json({ orderId, message: 'Commande créée avec succès' });
    } catch (err) {
        console.error('Erreur lors de la création de la commande :', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;
