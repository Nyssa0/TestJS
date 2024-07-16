const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    if (name && email) {
        res.status(200).send({ message: 'Formulaire reçu!' });
    } else {
        res.status(400).send({ error: 'Nom et email sont requis' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});

module.exports = app;