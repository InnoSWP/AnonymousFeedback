const form = document.getElementById('code-word-form');

form.onsubmit = () => {
    const codeWord = form.getElementsByTagName('input')[0].value;


    return false;
}