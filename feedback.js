const io = require('socket.io-client');
const { host } = require('./static/constants');
const URL = 'http://' + host; // server socket.io
const socket = io(URL, {
  autoConnect: false,
});

const feedbackTextField = document.getElementById('feedbackText');
const form = document.getElementById('form');

const query = new Proxy(new URLSearchParams(window.location.search), {
  get: (params, prop) => params.get(prop),
});
const codeword = query.codeword;
if (!codeword) document.location.href = '/';

socket.auth = { codeword: codeword };
socket.connect();

socket.on('connect', () => {
  console.log('You are successfully connected');
  socket.on('init', (teacher, title) => updateHeader(teacher, title));
})

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (feedbackTextField.value.trim() != "") {
    console.log(`You sent: "${feedbackTextField.value}" to session with codeword: "${codeword}"`);
    socket.emit('send-message', codeword, feedbackTextField.value, "neutral");
    feedbackTextField.value = "";
  }

})

const nameField = document.getElementById('name');
const sessionTitleField = document.getElementById('sessionTitle');

function updateHeader(teacher, title) {
  document.getElementById('name').innerText = teacher;
  document.getElementById('sessionTitle').innerText = title;
}



