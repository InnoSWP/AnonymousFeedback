const URL = 'http://localhost:4000';

const io = require('socket.io-client');

const socket = io(URL);

socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`);
  const link = document.getElementById('link-field');
  link.innerText = URL+'/feedback?codeword='+socket.id;

  socket.on('receive feedback', (feedback) => {
    console.log(`Incoming feedback: ${feedback.text}`);
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();
    console.log('Feedback time' + time);
  })
})