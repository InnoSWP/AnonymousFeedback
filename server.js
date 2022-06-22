const app = require('./index');
const http = require('http').createServer(app);
const getCodeword = require('./codewordSet');
module.exports = {
  start: () => {
    const io = require('socket.io')(http, {
      cors: {
        origin: '*',
      }
    });

    io.use((socket, next) => {
      console.log('Parameters from client:', socket.handshake.auth);
      if (socket.handshake.auth.id) {
        console.log(`Change from ${socket.id} to ${socket.handshake.auth.id}`)
        socket.id = socket.handshake.auth.id
      } else {
        socket.id = getCodeword();
      }
      next();
    })

    io.on('connection', socket => {
      // the client emits the send-message event 
      // codeword represents the ID of the TA 
      socket.on('send-message', (codeword, message) => {
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
        socket.to(codeword).emit("receive-message", { text: message, time: time }); // emits 
        // message & time to the room of the TA, using the codeword as the ID 
      })
      socket.on('update-session', (codeword, data) => { console.log(`Codeword: ${codeword} with data: ${JSON.stringify(data)}`) });
    })
  }, http
}