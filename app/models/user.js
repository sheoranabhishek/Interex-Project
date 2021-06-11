//represents the database table users

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type : String , required: true},
    email: { type : String , required: true},
    occupied: {type: Boolean , required:true , default: false}
})

const User = mongoose.model('User', userSchema);

module.exports =  User;