//represents the database table users

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const interviewSchema = new Schema({
    title: { type : String , required: true},
    description: { type : String , default: 'Coding Interview' },
    participants: { type : Array , required: true},
    startTime: {type: Date , required: true},
    endTime: {type: Date , required: true},
    date: {type: Date , required: true}
} , {timestamps: true});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports =  Interview;