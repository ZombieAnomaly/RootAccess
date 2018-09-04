const mongoose = require('mongoose'),
    FileSchema = mongoose.model('File').schema,
    FolderSchema = mongoose.model('Folder').schema

var HDSchema = new mongoose.Schema({
    size: {type:Number,required:true},
    folders: [FolderSchema],
    files: [FileSchema],
   }, {timestamps: true });

mongoose.model('HardDrive', HDSchema); // We are setting this Schema in our Models as 'User'
