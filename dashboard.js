console.log('hello world!')

const newSessionButton = document.getElementById('new-session-button');
newSessionButton.addEventListener('click', async () => {
    const title = prompt('Enter the title of a new session', '');
    console.log(title);
    const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title: title})
    }).then(data => data.json());
    console.log(response); // json body contains ID for creating new session on the page

    if(title != null && title.trim() !== '')
    {
        const sessionList = document.getElementById('session-list');
        console.log(sessionList.childNodes);

        const newSession = document.createElement('div');
        newSession.id = response.id;
        newSession.classList.add('session');
        newSession.innerHTML = `<div class="session-header"><span class="session-title">${title}</span><span class="session-time">17:49</span></div><div class="session-content"><span>Feedback text here</span></div>`;
        console.log(newSession);
        const button = document.getElementById('new-session-button');
        console.log(button);
        sessionList.insertBefore(newSession, button);
    }

})