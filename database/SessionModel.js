var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const feedback = {
    text: String,
    date: String,
    time: String
}

var sessionModelSchema = new Schema({
    feedback: [feedback],
    codeword: String,
    title: String,
    teacher: String
});

// find the use-case for the model in teacher-client.js

module.exports = mongoose.model("Session", sessionModel);