const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

module.exports = app;

app.use(express.json()) // for a server to accept json format
app.use(express.static('static/css'));
app.use(express.static('static'));


app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/student.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'student.js'));
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
app.get('/dashboard', (request, response) => {
    response.sendFile(path.join(__dirname, 'dashboard.html'));
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