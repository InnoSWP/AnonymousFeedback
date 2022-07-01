const io = require('socket.io-client');
const { addMessage } = require('./dashboard');
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

let lastMove = 0;
form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (feedbackTextField.value.trim() != "") {
    if (Date.now() - lastMove > 5000) {

      const satisfaction = document.querySelector('input[name="satisfaction"]:checked').value;
      console.log(`You sent: "${feedbackTextField.value}" with satisfaction: "${satisfaction}" to session with codeword: "${codeword}"`);
      const sec = document.getElementById('delay').value;
      socket.emit('send-message', codeword, feedbackTextField.value, satisfaction, sec);
      addMessage({ satisfaction, text: feedbackTextField.value, time: getTime() })
      feedbackTextField.value = "";

      lastMove = Date.now();
    }
    else {
      feedbackTextField.style.color = 'red';
      setTimeout(() => {
        feedbackTextField.style.color = 'black';
      }, 1000);
    }
  }

})

const nameField = document.getElementById('name');
const sessionTitleField = document.getElementById('sessionTitle');

function updateHeader(teacher, title) {
  document.getElementById('name').innerText = teacher;
  document.getElementById('sessionTitle').innerText = title;
}

function getTime() {
  let date = new Date();
  let hours = date.getHours().toString();
  if (hours.length == 1) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes().toString();
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  let time = hours + ":" + minutes;
  return time;
}


feedbackTextField.addEventListener('keypress', e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    console.log('Enter but not Shift');
    form.dispatchEvent(new Event('submit'));
  }
})

