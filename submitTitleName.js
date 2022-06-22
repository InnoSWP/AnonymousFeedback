import { getCookie } from './teacher-client';
import { socket } from './teacher-client';


export const nameEvent = () => {
    document.getElementById('name-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        console.log(`New name: ${name}`);

        const codeword = getCookie('token');
        socket.emit('update-session', codeword, { teacher: name });
    })
}