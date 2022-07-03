import { host } from '../static/constants';
import { getCookie } from './utils';

const exportButton = document.getElementById('export-button');

export const exportEvent = () => {
    exportButton.addEventListener('click', (event) => {
        event.stopPropagation(); // to avoid exiting the form

        const teacherID = getCookie('token');
        // console.log(teacherID);
        window.location.href = "/export?teacherID=" + teacherID;
    })
}