const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()) // for a server to accept json format

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
app.get('/login.css', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.css'));
})

app.post('/api/codeword', (request, response) => {
    
    const codeWord = request.body.codeword;s
    console.log(codeWord);

    //NEED LOGIC TO SEND flag whether codeword is in DB or not
    
    response.end();
})


const start = () => {
    try {
        app.listen(PORT, () => {console.log(`Server started on port:${PORT}`)});
    } catch(e) {
        console.log(e);
    }
}

start();