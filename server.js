const io = require('socket.io')(4000, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  // the client emits the send-message event 
  // codeword represents the ID of the TA 
  console.log(socket.id);
  socket.on('send-message', (codeword, message) => {
    let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes();
    socket.to(codeword).emit("receive-message", message, time); // emits 
    // message & time to the room of the TA, using the codeword as the ID 
  })
})