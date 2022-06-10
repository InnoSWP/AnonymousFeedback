onload = () => {
    const guestButton = document.getElementById('guest-button');
    guestButton.addEventListener('click', () => {
        const login = generateRandomString(32);
        const password = generateRandomString(32);

        

        const [name, surname] = prompt('Enter your name please', 'Jhon Smith').split(' ');
        fetch('/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, surname: surname, login: login, password:password})
        })

    })

    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => {
        fetch('/');
    })
}

function generateRandomString(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}