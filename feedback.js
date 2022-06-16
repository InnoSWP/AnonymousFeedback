const URL = 'http://localhost:5000'; // server socket.io

const io = require('socket.io-client');
const socket = io(URL);

const feedbackTextField = document.getElementById('feedbackText');
const form = document.getElementById('form');

const query = new Proxy(new URLSearchParams(window.location.search), {
  get: (params, prop) => params.get(prop),
});
let codeword = query.codeword;

socket.on('connect', () => {
  console.log('You are successfully connected');
})

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (feedbackTextField.value.trim() != "") {
    console.log(`You sent: "${feedbackTextField.value}" to session with codeword: "${codeword}"`);
    socket.emit('send-message', codeword, feedbackTextField.value);
    feedbackTextField.value = "";
  }
  
})



