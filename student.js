const form = document.getElementById('code-word-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const codeWord = document.getElementById('codeword').value;
    let valid = false;

    //check the presence of the codeWord - TODO
    // fetch('/api/codeword', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         codeword : codeWord
    //     })
    // })
    // .then(data => valid = data.text());

    location.href = '/feedback?codeword='+codeWord;
})