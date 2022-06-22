const mongoose = require('mongoose');

const url = 'mongodb+srv://system205:qwerty123@cluster0.xhzic3q.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url, () => {
    console.log('Successfully connected to MongoDB');
}, e => console.error(e))

const Session = require('./SessionModel');

const addSession = async (sessionInfo) => {
    const session = new Session(sessionInfo);

    await session.save().then(session => { console.log('New session:', session) })
        .catch(e => { console.log(e) });
}

const getFeedback = async (codeword) => {
    const session = await Session.findOne({ codeword: codeword });
    console.log(`Return array for code: ${codeword}: ${session.feedback}`);
    return session.feedback;
}

const addFeedback = async (codeword, feedback) => {
    const session = await Session.findOne({ codeword: codeword });
    const feedbackList = session.feedback;
    feedbackList.push(feedback);
    await session.save();
}


//USES
const runTest = async () => {
    await addSession({ teacher: '1', codeword: "AAB", feedback: [{ text: 'h!' }, { text: 'wowwwwww' }] })
    await addFeedback('AAB', { text: "hiiiiiiii", time: "11:11" })
    getFeedback('AAB');
}

runTest();
//REMOVE ALL
Session.remove({}, () => console.log('All documents removed from Session collection'));

module.exports = { addFeedback, getFeedback, addSession };
