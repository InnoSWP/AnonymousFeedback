const app = require('./index');
const http = require('http').createServer(app);
module.exports = {
  start: () => {
    const io = require('socket.io')(http, {
      cors: {
        origin: '*',
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', socket => {
      // the client emits the send-message event 
      // codeword represents the ID of the TA 
      socket.on('send-message', (codeword, message) => {
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes();
        socket.to(codeword).emit("receive-message", { text: message, time: time }); // emits 
        // message & time to the room of the TA, using the codeword as the ID 
      })
    })
  }, http
}