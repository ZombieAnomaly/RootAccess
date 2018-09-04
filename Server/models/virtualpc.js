const mongoose = require('mongoose')
    
var VPCSchema = new mongoose.Schema({
    owner: {type:String,required:true},
    ip: {type:String,required:true},
    password: {type:String,required:true},
    hardware:{type:mongoose.Schema.Types.Mixed}
   }, {timestamps: true });

mongoose.model('VirtualPc', VPCSchema); // We are setting this Schema in our Models as 'User'

