
import { socket } from './socket';
import { addMessage, copyEvent, updateLink, changeEvent } from './dashboard';
import { nameEvent, titleEvent } from './submitTitleName';
import { resetEvent } from './scripts/resetGuest';
import { exportEvent } from './scripts/exportSession'
import { formEvent } from './scripts/confirmForm';
import { getCookie } from './scripts/utils';


formEvent();
resetEvent();
exportEvent();
nameEvent();
titleEvent();
copyEvent();
changeEvent();

const audio = new Audio('notification_sound.mp3');

//Restore token
let token = getCookie('token'); // extract value of token from cookie
if (token) socket.auth = { id: token }; // to update id on the server
socket.connect();

socket.on('connect', () => {
    console.log('Connected id:', socket.id);
    if (!document.cookie.token) {
        document.cookie = 'token=' + socket.id; // save for future restoring
    }

    socket.on('receive-message', (feedback, id) => {
        console.log(`Receive feedback: ${feedback}`);
        addMessage(feedback, id);
        audio.play().catch(e => { console.log('Try to interact with the page to play audio') });
    })

    socket.on('init', (codeword, messages, teacher, title) => {
        console.log('Init from server:', codeword, messages)
        updateHeader(teacher, title);
        updateLink(codeword);
        if (messages) messages.forEach(feedback => addMessage(feedback, feedback._id));
    })
})
socket.onAny((event, ...args) => {
    console.log(event, args);
});



function updateHeader(teacher, title) {
    const $title = document.getElementById('session-title');
    $title.value = title;
    const name = document.getElementById('name');
    name.value = teacher;
    if (name.value) name.style.width = name.value.length + "ch";
    if ($title.value) $title.style.width = $title.value.length + "ch";
}
