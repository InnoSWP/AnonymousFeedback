const form = document.getElementById('code-word-form');

form.onsubmit = () => {
    const codeWord = form.getElementsByTagName('input')[0].value;
    let valid = false;

    //check the presence of the codeWord
    fetch('/api/codeword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            codeword : codeWord
        })
    })
    .then(data => valid = data.text());

    console.log(valid);

    return valid;
}