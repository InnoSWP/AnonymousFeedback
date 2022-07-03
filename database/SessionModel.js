var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const feedback = new Schema({
    text: {
        type: String,
        required: true
    },
    satisfaction: {
        type: String,
        default: 'unknown',
        required: true
    },
    date: {
        type: String,
        default: new Date,
        required: true
    },
    time: {
        type: String,
        default: (new Date().getHours()) + ":" + (new Date().getMinutes()),
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: false,
        default: ""
    },
});

var sessionSchema = new Schema({
    feedback: [feedback],
    codeword: {
        type: String,
        unique: true,
        required: true
    },
    title: { type: String, default: "" },
    teacher: { type: String, default: "" },
    teacherID: { type: String, required: true },
    date: {
        type: Date,
        default: new Date(),
        required: true
    },
});

// find the use-case for the model in teacher-client.js

module.exports = mongoose.model("Session", sessionSchema);