const URL = 'http://localhost:5000'; // server socket.io

import { addMessage, copyEvent } from './dashboard';
copyEvent();
import { io } from 'socket.io-client';
const socket = io(URL, {
    autoConnect: false,
});

const linkText = document.getElementById('link-field');
const link = 'http://localhost:5000/feedback?codeword='; // for student to enter the feedback
linkText.value = 'Server is disconnected, sorry';

let token = getCookie('token'); // extract value of token from cookie
if (token) {
    socket.auth = { id: token }; // to update id on the server
}
socket.connect();

socket.on('connect', () => {
    console.log('Connected id:', socket.id);
    if (!document.cookie.token) {
        document.cookie = 'token=' + socket.id; // save for future restoring
    }
    const codeword = socket.id;
    linkText.value = link + codeword;

    socket.on('receive-message', (feedback) => {
        addMessage(feedback);
    })

})
socket.onAny((event, ...args) => {
    console.log(event, args);
});

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}