const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
const converter = require('json-2-csv');
const fs = require('fs');

const Session = require('./database/SessionModel');
const mongoose = require('mongoose')
const fns = require('date-fns')

module.exports = app;

app.use(express.json()) // for a server to accept json format
app.use(express.static('static'));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/student.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'student.js'));
})
app.get('/index.css', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.css'));
})
app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.html'));
})
app.get('/guest.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'guest.js'));
})
app.get('/login.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.js'));
})
app.get('/login.css', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.css'));
})
app.get('/dashboard', (request, response) => {
    response.sendFile(path.join(__dirname, 'dashboard.html'));
})
app.get('/dashboard.css', (request, response) => {
    response.sendFile(path.join(__dirname, 'dashboard.css'));
})
app.get('/dashboard.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'dashboard.js'));
})
app.get('/feedback', (request, response) => {
    response.sendFile(path.join(__dirname, 'feedback.html'));
})
app.get('/feedback.css', (request, response) => {
    response.sendFile(path.join(__dirname, 'feedback.css'));
})
app.get('/feedback.bundle.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'feedback.bundle.js'));
})
app.get('/teacher.bundle.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'teacher.bundle.js'));
})
app.get('/notification_sound.mp3', (request, response) => {
    response.sendFile(path.join(__dirname, 'notification_sound.mp3'));
})
app.get('/export', async (request, response) => {
    const teacherID = request.query.teacherID;

    var filename = "feedback.csv";

    await Session.findOne({ 'teacherID': teacherID }).select('feedback').lean().then(function (doc) {
        if (!doc) {
            // throw new Error('No record found');
            console.log(`Session with teacherID: ${teacherID} was NOT FOUND`);
            response.end('Your session is not found, try to create one');
            return
        }

        var filteredDoc = []
        doc.feedback.forEach(entry => {
            var data = { "Date": fns.format(new Date(entry.date), "dd.MM.yyyy"), "Time": entry.time, "Text": entry.text, "Satisfaction": entry.satisfaction };
            filteredDoc.push(data);
        });

        converter.json2csv(filteredDoc, async (err, csv) => {
            if (err) {
                throw err;
            }
            fs.writeFileSync(filename, csv);
            response.download(filename);
        });
    });
})
app.post('/api/codeword', (request, response) => {

    const codeWord = request.body.codeword; s
    console.log(codeWord);

    //NEED LOGIC TO SEND flag whether codeword is in DB or not

    response.end();
})
app.post('/api/feedback', (request, response) => {
    //LOGIC WITH CREATING A NEW SESSION FOR USER WITH TOKEN IN COOKIES IN DATABASE

    const id = 1311;
    response.json({ id: id }) // send the id of a created session
})

const start = () => {
    const server = require('./server');
    try {
        server.http.listen(PORT, () => { console.log(`Server started on port:${PORT}`) });
    } catch (e) {
        console.log(e);
    }

    server.start();

}

start();