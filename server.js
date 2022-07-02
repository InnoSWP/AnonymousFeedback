const app = require('./index');
const http = require('http').createServer(app);
const { updateSession, addSession, getSession, addFeedback, getSessionByCodeword, removeSession } = require('./database/mongodb');
const { getNewCodeword } = require('./codewordSet');
const Filter = require('bad-words');
const filter = new Filter();

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

      next();
    })

    io.on('connection', async socket => {
      // the client emits the send-message event 
      // codeword represents the ID of the TA 

      // It was a teacher entered dashboard
      if (socket.session) {
        console.log('Init the client with codeword:', socket.session.codeword);
        socket.join(socket.session.codeword);
        io.to(socket.id).emit('init', socket.session.codeword, socket.session.feedback, socket.session.teacher, socket.session.title);
      } else if (socket.handshake.auth.codeword) {
        const session = await getSessionByCodeword(socket.handshake.auth.codeword);
        if (session)
          io.to(socket.id).emit('init', session.teacher, session.title);
        else
          io.to(socket.id).emit('init', "", "");
      }

      socket.on('send-message', (codeword, message, satisfaction, delay, time) => {
        // const time = getTime();
        message = filter.clean(message);
        setTimeout(() => {
          addFeedback(codeword, { time, text: message, satisfaction }); // add to database
          socket.to(codeword).emit("receive-message", { text: message, time, satisfaction });
        }, delay * 1000);
      })
      socket.on('update-session', (codeword, data) => {
        console.log(`Codeword: ${codeword} with data: ${JSON.stringify(data)}`);
        updateSession(codeword, data);
      });

      socket.on('remove-session', (teacherID) => {
        console.log(`Deleting session from database with teacherID: ${teacherID}`);
        removeSession(teacherID);
      });
    })
  }, http
}
