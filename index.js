const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()) // for a server to accept json format

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
})

const start = () => {
    try {
        app.listen(PORT, () => {console.log(`Server started on port:${PORT}`)});
    } catch(e) {
        console.log(e);
    }
}

start();