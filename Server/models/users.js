const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    username: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,min:8, required:true},
   }, {timestamps: true });

mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'

