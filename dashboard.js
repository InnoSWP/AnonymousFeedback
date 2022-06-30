import { host } from "./static/constants";

const audio = new Audio('notification_sound.mp3');
export function addMessage(feedback) {
    const feedbackList = document.getElementById('feedback-list');
    const newMessage = document.createElement('div');
    newMessage.classList.add('feedback-item');

    newMessage.innerHTML = `
                            <div class="feedback-image"><img src="/${feedback.satisfaction}.png"></div>
                            <div class="feedback-text">${feedback.text.replace(/</g, '&#60;')
            .replace(/>/g, "&#62;").replace(/\\/g, "&#92;")}</div >
                <div class="feedback-time">${feedback.time}</div>
                            `
    audio.play().catch(e => { console.log('Try to interact with the page to play audio') });

    feedbackList.insertAdjacentElement("afterbegin", newMessage);
}

export const copyEvent = () => {
    document.getElementById('copy-button').addEventListener('click', () => {
        let link = document.getElementById("link-field");
        if (!link.value) return;
        link.select();
        link.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(link.value);
        link.setSelectionRange(0, 0);
        link.blur();

        const button = document.getElementById('copy-button');
        const initialText = button.innerText;
        button.innerText = 'Copied!';
        setTimeout(() => { button.innerText = initialText; }, 1000);
    })
}

export function updateLink(codeword) {
    const linkText = document.getElementById('link-field');
    const link = 'http://' + host + '/feedback?codeword='; // for student to enter the feedback
    if (!codeword) linkText.value = 'Server is disconnected, sorry';
    linkText.value = link + codeword;
}

export const changeEvent = () => {
    const $name = document.getElementById('name');
    $name.addEventListener('input', (event) => {
        if ($name.value.length < 10) { $name.style.width = 10 + "ch"; return }
        $name.style.width = $name.value.length + "ch";
    })
    const $title = document.getElementById('session-title');
    $title.addEventListener('input', (event) => {
        if ($title.value.length < 10) { $title.style.width = 10 + "ch"; return }
        $title.style.width = $title.value.length + "ch";
    })
}

