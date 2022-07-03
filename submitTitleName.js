import { getCookie } from './scripts/utils';
import { socket } from './socket';


export const nameEvent = () => {
    document.getElementById('name-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const nameField = document.getElementById('name');
        const name = nameField.value;
        console.log(`New name: ${name}`);

        const teacherID = getCookie('token');
        socket.emit('update-session', teacherID, { teacher: name });
        nameField.blur();
    })
}
export const titleEvent = () => {
    document.getElementById('title-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const titleField = document.getElementById('session-title');
        const title = titleField.value;
        console.log(`New name: ${title}`);

        const teacherID = getCookie('token');
        socket.emit('update-session', teacherID, { title: title });
        titleField.blur();
    })
}