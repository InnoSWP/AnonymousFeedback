const io = require('socket.io', 4000, {
  cors: [
    origin: '*', 
    methods: ["GET", "POST"]
  ]
});

io.on('connection', socket => {
  // the client emits the send-message event 
  // codeword represents the ID of the TA 
  socket.on('send-message', (codeword, message) {
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();
    socket.to(codeword).emit("receive-message", message, time); // emits 
    // message & time to the room of the TA, using the codeword as the ID 
  })  
})