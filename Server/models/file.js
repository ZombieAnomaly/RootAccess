const mongoose = require('mongoose')

var FileSchema = new mongoose.Schema({
    size: {type:Number,required:true},
    type: {type:String,required:true},
    name: {type:String,required:true},
    content: {type:String,required:true},
   }, {timestamps: true });

mongoose.model('File', FileSchema); // We are setting this Schema in our Models as 'User'