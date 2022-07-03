const app = require('./index');
const http = require('http').createServer(app);
const { updateSession, addSession, getSession, addFeedback, getSessionByCodeword, removeSession, getMessages, updateResponse } = require('./database/mongodb');
const { getNewCodeword } = require('./codewordSet');
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

      console.log('Parameters from teacher:', socket.handshake.auth);
      if (socket.handshake.auth.id) {
        console.log(`Change from ${socket.id} to ${socket.handshake.auth.id}`)
        socket.id = socket.handshake.auth.id
      } else {
        await addSession({ teacherID: socket.id, codeword: getNewCodeword() });
      }

      socket.session = await getSession(socket.id);

      next();
    })

    io.use(async (socket, next) => {
      //Only for feedback page initialization
      if (!socket.request.headers.referer.includes('/feedback')) { next(); return };

      socket.messages = []; // Restored messages
      console.log(`From feedback page: ${JSON.stringify(socket.handshake.auth)} `)
      if (socket.handshake.auth.id) { // Socket was previously connected 
        console.log(`Change student from ${socket.id} to ${socket.handshake.auth.id}`)
        socket.id = socket.handshake.auth.id
        socket.messages = await getMessages(socket.id, socket.handshake.auth.codeword);
      }
      next();
    })

    io.on('connection', async socket => {
      // It was a teacher entered dashboard
      if (socket.session) {
        console.log('Init the teacher with codeword:', socket.session.codeword);
        socket.join(socket.session.codeword);
        io.to(socket.session.codeword).emit('init', socket.session.codeword, socket.session.feedback, socket.session.teacher, socket.session.title);
      }
      // else if (socket.request.headers.referer.includes('/dashboard') && socket.handshake.auth.codeword) {
      //   console.log('NOT PoSSIblE TO ENTER HERE')
      //   const session = await getSessionByCodeword(socket.handshake.auth.codeword);
      //   if (session)
      //     io.to(socket.id).emit('init', session.teacher, session.title);
      //   else
      //     io.to(socket.id).emit('init', "", "");
      // }

      if (socket.messages) {
        console.log('Send messages to the student with id:', socket.id);
        // const messages = await getMessages(socket.id, socket.handshake.auth.codeword);
        io.to(socket.id).emit('restore-messages', { messages: socket.messages }); // Send previously sent messages
        // io.to(socket.id).emit('response', { time: '11:11', text: ' I`m teacher', satisfaction: 'unknown' }); // Send previously sent messages
      }

      socket.on('send-message', (codeword, message, satisfaction, delay, time) => {
        // const time = getTime();
        setTimeout(async () => {
          const feedback = { time, text: message, satisfaction, sender: socket.id };
          const id = await addFeedback(codeword, feedback); // add to database
          console.log(`Added ID: ${id} and send to codeword: ${codeword}`);
          io.to(codeword).emit("receive-message", feedback, id);
        }, delay * 1000);
      })

      socket.on('update-response', async (text, feedbackID) => {
        await updateResponse(socket.id, feedbackID, text);
      })
      socket.on('update-session', (codeword, data) => {
        console.log(`Codeword: ${codeword} with data: ${JSON.stringify(data)}`);
        updateSession(codeword, data);
      });

      socket.on('remove-session', (teacherID) => {
        console.log(`Deleting session from database with teacherID: ${teacherID}`);
        removeSession(teacherID);
      });

      socket.on('update-response', (response, messageID, sender) => {
        console.log(`Send to: ${sender} a message: ${response}`);
        io.to(sender).emit('receive-response', response, messageID)
      })
    })
  }, http
}
