import { host } from "./static/constants";
import { socket } from './socket';

export function addMessage(feedback, id) {
    const feedbackList = document.getElementById('feedback-list');
    const newMessage = document.createElement('div');
    newMessage.classList.add('feedback-item');

    console.log(`Add message: ${JSON.stringify(feedback)} with ID: ${id}`)
    if (id) newMessage.setAttribute('id', id);

    newMessage.innerHTML = `
                            <div class="feedback-image"><img ${feedback.satisfaction != 'unknown' ? '' : 'style = "display:none"'}
                             src = "/${feedback.satisfaction}.png" ></div >
                            <div class="feedback-text">${feedback.text.replace(/</g, '&#60;')
            .replace(/>/g, "&#62;").replace(/\\/g, "&#92;")}</div >
                <div class="feedback-time">${feedback.time}</div>
`
    feedbackList.insertAdjacentElement("afterbegin", newMessage);

    // Teacher`s side
    if (window.location.href.includes('/dashboard')) {
        newMessage.setAttribute('sender', feedback.sender);
        newMessage.addEventListener('click', e => {
            e.preventDefault();
            const sender = newMessage.getAttribute('sender');

            const form = document.createElement('form');
            form.innerHTML = '<input class="response-input" type="text" placeholder="Write the response">';
            form.style.display = 'block';
            newMessage.childNodes[3].appendChild(form);

            // Send response
            form.addEventListener('submit', e => {
                e.preventDefault();
                const response = form.childNodes[0].value;
                console.log(`Your response is ${response} to ${sender}`);
                socket.emit('send-response', sender, { text: response });
                form.childNodes[0].blur();
            })

        }, { once: true });
    }

    if (window.location.href.includes('/feedback')) {
        const a = 1;
    }

    if (Math.abs(feedbackList.scrollTop) < 200)
        feedbackList.scrollTop = 0;
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
        const initialBoxShadow = button.style.boxShadow;
        button.style.boxShadow = '1px 1px 7px green';
        setTimeout(() => { button.style.boxShadow = initialBoxShadow; }, 1000);
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

