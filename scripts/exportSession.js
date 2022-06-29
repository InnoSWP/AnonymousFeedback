import { getCookie } from '../teacher-client';
const URL = 'http://localhost:5000'; 

const exportButton = document.getElementById('export-button');

export const exportEvent = () => {
    exportButton.addEventListener('click', (event) => {
        event.stopPropagation(); // to avoid exiting the form

        const teacherID = getCookie('token');
        // console.log(teacherID);
        window.location.href = URL + "/export?teacherID=" + teacherID;
    })
}