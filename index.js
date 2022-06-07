const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()) // for a server to accept json format

app.get('/', (response, request) => {
    request.end('Hello world!');
})

const start = () => {
    try {
        app.listen(PORT, () => {console.log(`Server started on port:${PORT}`)});
    } catch(e) {
        console.log(e);
    }
}

start();