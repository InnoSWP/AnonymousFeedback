console.log('hello world!')

const newSessionButton = document.getElementById('new-session-button');
newSessionButton.addEventListener('click', () => {
    console.log('Hello');
    const title = prompt('Enter the title of a new session', '');
    const id = fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title: title})
    }).then(data => data.json());
    console.log(id);
})