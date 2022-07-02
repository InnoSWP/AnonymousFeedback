const io = require('socket.io-client');
const { addMessage } = require('./dashboard');
const { host } = require('./static/constants');
const URL = 'http://' + host; // server socket.io
const socket = io(URL, {
  autoConnect: false,
});

let token = getCookie('token'); // extract value of token from cookie
if (token) socket.auth = { id: token }; // to update id on the server

const feedbackTextField = document.getElementById('feedbackText');
const form = document.getElementById('form');

const query = new Proxy(new URLSearchParams(window.location.search), {
  get: (params, prop) => params.get(prop),
});
const codeword = query.codeword;
if (!codeword) document.location.href = '/';

socket.auth = { ...socket.auth, codeword: codeword };
socket.connect();

socket.on('connect', () => {
  if (!document.cookie.token) {
    document.cookie = 'token=' + socket.id; // save for future restoring
  }
  console.log('You are successfully connected');
  socket.on('init', (teacher, title) => updateHeader(teacher, title));
  socket.on('restore-messages', ({ messages }) => { messages.forEach(addMessage) })
})

let lastMove = 0;
form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (feedbackTextField.value.trim() != "") {
    if (Date.now() - lastMove > 5000) {

      const checkedEmoji = document.querySelector('input[name="satisfaction"]:checked');
      let satisfaction;
      if (checkedEmoji)
        satisfaction = checkedEmoji.value;
      else
        satisfaction = 'unknown';
      console.log(`You sent: "${feedbackTextField.value}" with satisfaction: "${satisfaction}" to session with codeword: "${codeword}"`);
      const sec = document.getElementById('delay').value;
      socket.emit('send-message', codeword, feedbackTextField.value, satisfaction, sec, getTime(sec));
      addMessage({ satisfaction, text: feedbackTextField.value, time: getTime(0) })
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

function getTime(delay) {
  let date = new Date();
  date.setMinutes(date.getMinutes() + Math.floor(delay / 60));
  let hours = date.getHours().toLocaleString();
  if (hours.length == 1) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes().toLocaleString();
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

let prevChecked = null;
const radios = document.querySelectorAll('input[name="satisfaction"]');
radios.forEach(radio => radio.addEventListener('click', (e) => {
  if (!prevChecked) {
    prevChecked = radio;
    return
  }
  if (radio === prevChecked) {
    prevChecked = null;
    radio.checked = false;
  }
  else {
    prevChecked = radio;
    radio.checked = true
  }
}));

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}
