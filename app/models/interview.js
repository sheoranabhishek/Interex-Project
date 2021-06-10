//represents the database table users

const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema

const interviewSchema = new Schema({
    title: { type : String , required: true},
    description: { type : String , default: 'Coding Interview' },
    participants: [{type : mongoose.Schema.Types.ObjectId,ref : 'User' , required: true} ],
    status: {type: String , default: 'Upcoming'},
    startTime: {type: String , required: true},
    endTime: {type: String , required: true},
    date: {type: String , required: true}
} , {timestamps: true});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports =  Interview;

