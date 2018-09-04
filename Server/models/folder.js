const mongoose = require('mongoose'),
    FileSchema = mongoose.model('File').schema;

var FolderSchema = new mongoose.Schema({
    size: {type:Number},
    name: {type:String,required:true},
    folders: [],
    files: [FileSchema],
   }, {timestamps: true });

mongoose.model('Folder', FolderSchema); // We are setting this Schema in our Models as 'User'