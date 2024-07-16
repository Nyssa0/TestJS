const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src/views')));
app.use('/controllers', express.static(path.join(__dirname, 'src/controllers')));
app.use('/models', express.static(path.join(__dirname, 'src/models')));

// In-memory storage for simplicity
let courses = [];

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Nom et email sont requis' });
    }
    // Handle form data (e.g., save to database)
    res.status(200).json({ message: 'Formulaire reçu!' });
});

// Handle course enrollment
app.post('/enroll', (req, res) => {
    const { courses: newCourses } = req.body;
    const schedule = {};

    // Check for overlaps with existing courses
    for (const enrolledCourses of courses) {
        for (const [subject, { day, time }] of Object.entries(enrolledCourses)) {
            const key = `${day}-${time}`;
            if (schedule[key]) {
                return res.status(400).json({ message: 'Un cours est déjà inscrit à ce jour.' });
            }
            schedule[key] = subject;
        }
    }

    // Check for overlaps within the new courses
    for (const [subject, { day, time }] of Object.entries(newCourses)) {
        const key = `${day}-${time}`;
        if (schedule[key]) {
            return res.status(400).json({ message: 'Un cours est déjà inscrit à ce jour.' });
        }
        schedule[key] = subject;
    }

    courses.push(newCourses);
    res.status(200).json({ message: 'Inscription aux cours réussie!' });
});

// Fetch enrolled courses
app.get('/courses', (req, res) => {
    res.status(200).json({ courses });
});

module.exports = app;
