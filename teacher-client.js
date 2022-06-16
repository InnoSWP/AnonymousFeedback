const URL = 'http://localhost:4000'; // server socket.io

const io = require('socket.io-client');
const socket = io(URL);

const linkText = document.getElementById('link-field');
const link = 'http://localhost:5000/feedback?codeword='; // for student to enter the feedback
linkText.value = 'Server is disconnected, sorry';

socket.on('connect', () => {
    console.log('connected to server')
    const codeword = socket.id;
    linkText.value = link+codeword;
    console.log('Start receiving messages:', linkText.value);

    socket.on('receive-message', (feedback) => {
        addMessage(feedback);
    })


})