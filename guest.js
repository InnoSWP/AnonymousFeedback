
const guestButton = document.getElementById('guest-button');
guestButton.addEventListener('click', () => {
   location.href = '/dashboard';
})

const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
    location.href = '/';
})

