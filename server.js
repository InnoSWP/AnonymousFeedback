const app = require('./index');
const http = require('http').createServer(app);
const { updateSession, addSession, getSession } = require('./database/mongodb');
const getNewCodeword = require('./codewordSet');
module.exports = {
  start: () => {
    const io = require('socket.io')(http, {
      cors: {
        origin: '*',
      }
    });

    io.use(async (socket, next) => {
      //For dashbord initialization
      if (!socket.request.headers.referer.includes('/dashboard')) { next(); return };

      console.log('Parameters from client:', socket.handshake.auth);
      if (socket.handshake.auth.id) {
        console.log(`Change from ${socket.id} to ${socket.handshake.auth.id}`)
        socket.id = socket.handshake.auth.id
      } else {
        await addSession({ teacherID: socket.id, codeword: getNewCodeword() });
      }

      socket.session = await getSession(socket.id);
      socket.codeword = socket.session.codeword;

      next();
    })

    io.on('connection', socket => {
      // the client emits the send-message event 
      // codeword represents the ID of the TA 

      // It was a teacher entered dashboard
      if (socket.session) {
        console.log('Init the client with codeword:', socket.session.codeword);
        socket.join(socket.codeword);
        io.to(socket.id).emit('init', socket.session.codeword, socket.session.feedbackList);
      }

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
      socket.on('update-session', (codeword, data) => {
        console.log(`Codeword: ${codeword} with data: ${JSON.stringify(data)}`);
        updateSession(codeword, data);
      });
    })
  }, http
}