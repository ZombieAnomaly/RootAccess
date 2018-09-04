const mongoose = require('mongoose');
    //FileSchema = mongoose.model('File').schema

var CPUSchema = new mongoose.Schema({
    speed: {type:Number,required:true},
    name: {type:String,required:true},
    threads:{type:mongoose.Schema.Types.Mixed},
   }, {timestamps: true });

mongoose.model('CPU', CPUSchema); // We are setting this Schema in our Models as 'User'
