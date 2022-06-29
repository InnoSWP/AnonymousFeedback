import { addMessage, copyEvent, updateLink } from './dashboard';
import { nameEvent, titleEvent } from './submitTitleName';
import { resetEvent } from './scripts/resetGuest';
import { exportEvent } from './scripts/exportSession'
import { formEvent } from './scripts/confirmForm';
formEvent();
resetEvent();
exportEvent();
nameEvent();
titleEvent();
copyEvent();
import { io } from 'socket.io-client';
import { host } from './static/constants';
const URL = 'http://' + host; // server socket.io
export const socket = io(URL, {
    autoConnect: false,
});

//Restore token
let token = getCookie('token'); // extract value of token from cookie
if (token) socket.auth = { id: token }; // to update id on the server
socket.connect();

socket.on('connect', () => {
    console.log('Connected id:', socket.id);
    if (!document.cookie.token) {
        document.cookie = 'token=' + socket.id; // save for future restoring
    }

    socket.on('receive-message', (feedback) => {
        addMessage(feedback);
    })

    socket.on('init', (codeword, messages, teacher, title) => {
        console.log('Init from server:', codeword, messages)
        updateHeader(teacher, title);
        updateLink(codeword);
        if (messages) messages.forEach(feedback => addMessage(feedback));
    })
})
socket.onAny((event, ...args) => {
    console.log(event, args);
});

export function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}

function updateHeader(teacher, title) {
    document.getElementById('session-title').value = title;
    document.getElementById('name').value = teacher;
}
