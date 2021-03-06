const mongoose = require('mongoose');
const { deleteCodeword } = require('../codewordSet');

const url = 'mongodb+srv://system205:qwerty123@cluster0.xhzic3q.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url, () => {
    console.log('Successfully connected to MongoDB');
}, e => console.error(e))

const Session = require('./SessionModel');

const addSession = async (sessionInfo) => {
    const session = new Session(sessionInfo);

    await session.save().then(session => { console.log('New session:', session) })
        .catch(e => { console.log(e) });
    return session;
}

const removeSession = async (teacherID) => {
    const session = await Session.findOne({ teacherID: teacherID });
    if (!session) return;
    deleteCodeword(session.codeword);
    await Session.deleteOne(session).then(() => { console.log('Session Deleted from database Successfully') })
        .catch(e => { console.log(e) });
}

const getFeedback = async (codeword) => {
    const session = await Session.findOne({ codeword: codeword });
    console.log(`Return array for code: ${codeword}: ${session.feedback}`);
    return session.feedback;
}

const addFeedback = async (codeword, feedback) => {
    const session = await Session.findOne({ codeword: codeword });
    if (!session) return;
    const feedbackList = session.feedback;
    feedbackList.push(feedback);
    console.log(`Added feedback: ${JSON.stringify(feedback)}`)
    await session.save();
    return feedbackList[feedbackList.length - 1].id;
}

const updateSession = async (teacherID, { teacher, title }) => {
    const session = await Session.findOne({ teacherID: teacherID });
    if (!session) { console.log(`Session for teacher: ${teacherID} was NOT FOUND to update name/title`); return }
    if (teacher) session.teacher = teacher;
    if (title) session.title = title;
    await session.save();
    console.log(`Updated session: ${await Session.findOne({ teacherID: teacherID })}\n`);
}
const getSession = async (teacherID) => {
    let session;
    try {
        session = await Session.findOne({ teacherID: teacherID });
    } catch (e) {
        console.log('Session was not found probably:', e);
    }
    return session;
}
const getSessionByCodeword = async (codeword) => {
    let session;
    try {
        session = await Session.findOne({ codeword: codeword });
    } catch (e) {
        console.log('Session by codeword was not found probably:', e);
    }
    return session;
}

const getMessages = async (studentID, codeword) => {
    let messages = [];
    let session;
    try {
        session = await Session.findOne({ codeword });
    } catch (e) {
        console.log('Session was not found probably:', e);
        messages = [{ satisfaction: 'unknown', text: "Hello. Sorry, it seems that your link is invalid or you entered wrong codeword:" + codeword, time: "" }];
        return messages;
    }
    if (session) session.feedback.forEach(feedback => { if (feedback.sender == studentID) messages.push(feedback) })
    else
        messages = [{ satisfaction: 'unknown', text: "Hello. Sorry, it seems that your link is invalid or you entered wrong codeword:" + codeword, time: "" }];
    return messages;
}

const updateResponse = async (teacherID, feedbackID, text) => {
    const session = await getSession(teacherID);
    if (!session) { console.log('NO SESSION TO UPDATE RESPONSE'); return };
    const feedback = session.feedback;

    const entry = feedback.find(entry => entry._id == feedbackID);
    entry.response = text;
    await session.save();
    console.log(`Updated response of feedback: ${entry.response}`);
}


//USES
const runTest = async () => {
    await addSession({ teacher: '1', codeword: "AAB", feedback: [{ text: 'h!' }, { text: 'wowwwwww' }] })
    await updateSession('AAB', { teacher: 'Ivan', title: "Kek" });
    await addFeedback('AAB', { text: "hiiiiiiii", time: "11:11" })
    getFeedback('AAB');
}

// runTest();
//REMOVE ALL
// Session.remove({}, () => console.log('All documents removed from Session collection'));

module.exports = { addFeedback, getFeedback, addSession, updateSession, getSession, getSessionByCodeword, removeSession, getMessages, updateResponse };
