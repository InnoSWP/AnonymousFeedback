const form = document.getElementById('confirm-form');
import { socket } from '../socket';
import { getCookie } from './utils';

export const formEvent = () => {
    form.addEventListener('click', (e) => e.stopPropagation()); // to avoid exiting by click on form

    const btnYES = document.querySelector('.confirm-button:first-of-type');
    const btnNO = document.querySelector('.confirm-button:nth-of-type(2)');
    btnYES.addEventListener('click', (event) => {
        console.log('YES pressed');
        form.style.display = 'none';
        const teacherID = getCookie('token');
        document.cookie = "token=expired; expires=Sat, 20 Jan 1980 12:00:00 UTC";
        socket.emit('remove-session', teacherID);
        location.reload();
    })
    btnNO.addEventListener('click', (event) => {
        console.log('NO pressed');
        form.style.display = 'none';
    })

    window.addEventListener('click', () => {
        console.log('CLICK outside');
        form.style.display = 'none';
    })
}

export const confirm = () => {
    form.style.display = 'flex';
}