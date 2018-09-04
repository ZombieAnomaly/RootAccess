
var session = require('express-session');
const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    VPC = mongoose.model('VirtualPc'),
    HardDrive = mongoose.model('HardDrive'),
    CPU = mongoose.model('CPU'),
    File = mongoose.model('File'),
    Folder = mongoose.model('Folder'),
    HDSchema = mongoose.model('HardDrive').schema


module.exports = {

    index(req,res){
        User.find({}, function(err,users){
            res.json({'users':users});
        })
    },

    checkSession(req,res){
        console.log(req.session);
        if(req.session.email && req.session.username && req.session.user_id){
            VPC.findOne({owner:req.session.user_id}, function(err,vpc){
                //console.log(err,vpc);
                if(err){
                    res.json({error: "couldn't find virtualPC!"}); return;
                }else{
                    res.json({session:true, data:req.session, virtualPC:vpc});return;
                }
            })
        }else{
            res.json({session:false}); return;
        }
    },

    getHardDrive(req,res){
        console.log("HardDrive: ", req.session);
        if(req.session.email && req.session.username && req.session.user_id){
            VPC.findOne({owner:req.session.user_id}, function(err,vpc){
                //console.log(err,vpc);
                if(err){
                    res.json({error: "couldn't find virtualPC!"}); return;
                }else{
                    res.json({session:true, hardDrive:vpc.hardware.hd});return;
                }
            })
        }else{
            res.json({session:false}); return;
        }
    },

    generatePassword() {
        var length = 6,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    },

    generateFileStructure(){
        let arr = [];
        let sysLog = new File({
            size:1,
            type:"log",
            name:"syslog",
            content:""            
        })

        let fileStruct = [
            {name:'root',folders:[
                {name:'System',folders:[
                    {name:'Desktop',folders:[],
                    files:this.generateBaseFiles()},
                    {name:'Apps',folders:[],
                    files:[]},
                ],
                files:[sysLog]},
            ],
            files:[]
            }   
        ];

        return this.parseFileStruct(fileStruct);
    },

    parseFileStruct(fileStruct){
        var folders = [];
        for(var i=0;i<fileStruct.length;i++){
            var folder = new Folder({
                name: fileStruct[i].name,
                files: fileStruct[i].files,
                folders: fileStruct[i].folders[0] ? this.parseFileStruct(fileStruct[i].folders) : []
            })
            folders.push(folder);
        }
        return folders;
    },

    generateBaseFiles(){
        let arr = [];
        let software = ['firewall', 'waterwall', 'cracker']
        for(var i=0;i<3;i++){
            var file = new File({
                size:3,
                type:"app",
                name:software[i],
                content:""
            })
            arr.push(file);
        }
        return arr;
    },

    register(req,res){
        
        User.find({email:req.body.Email}, function(err,user){
            if(user.length > 0){res.json({error: "User already exists with this email!"}); return;}
        });
        User.find({email:req.body.Username}, function(err,user){
            if(user.length > 0){res.json({error: "User already exists with this username!"}); return;}
        });

        if(req.body.Password != req.body.ConfirmPass){
            res.json({error: "Passwords do not match!"}); return;
        }else if(!req.body.Email.includes("@")){
            res.json({error: "Email must be valid!"}); return;
        }else if(req.body.Password.length < 8){
            res.json({error: "Password must be at least 8 characters!"}); return;
        }

        var user = new User({
            username: req.body.Username,
            email: req.body.Email,
            password: req.body.Password
        });

        var hd = new HardDrive({
            size:250,
            folders: this.generateFileStructure(),
            files: [],
        });

        // var cpu = new CPU({
        //     speed:.5,
        //     name:"SnailTrail CPU_1.0",
        //     threads:{
        //         main:
        //     }
        // });

        var vpc = new VPC({
            owner: user._id,
            ip: (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0),
            password: this.generatePassword(),
            hardware:{
                cpu:{speed:.5},
                hd:[hd],
                network:{speed:5}
            }
        })

        user.save(function(err, user) {
            if(err){ // if there is an error console.log that something went wrong!
                res.json({error:err}); return
            }else {// else console.log that we did well and then redirect to the root route
                vpc.save(function(err,vpc) {
                    if(err){
                        res.json({error:err}); return;
                    }
                });
                req.session.username = user.username;
                req.session.email = user.email;                
                req.session.save();
                res.json({success:true, data:user, virtualPC:vpc});
            }
          });

    },

    remove(req,res){
        console.log(req.body);
        // var id = mongoose.Types.ObjectId(req.params.id);
        // Task.remove( {_id:id},function(err) {
        //     // if there is an error console.log that something went wrong!
        //     if(err) {
        //       res.json({'error':err});
        //     } else { // else console.log that we did well and then redirect to the root route
        //       res.json({'success':true});
        //     }
        //   })
        // This is where we would add the user from req.body to the database.
    }, 

    update(req,res){
        console.log(req.body);
        // var id = mongoose.Types.ObjectId(req.params.id);
        // var Title, Desc, Completed;

        // Task.findOne({_id:id}, function(err,task){
        //     console.log(task)
        //     Title = task.title;
        //     Desc = task.description;
        //     Completed = task.completed;

        //     for(var k in req.body){
        //         if(k == "title")
        //             Title = req.body.title
        //         else if(k == "description")
        //             Desc = req.body.description
        //         else if(k == "completed")
        //             Completed = req.body.completed
        //     }
        //     console.log(Title, Desc, Completed);

        //     Task.update({_id:id}, {
        //         $set: {
        //             title: Title,
        //             description: Desc,
        //             completed: Completed
        //         }},
        //         function(err,doc){
        //             console.log("updated",doc)
        //             if(doc.nModified == 1){
        //                 res.json({'updated': doc})
        //             }
        //         }
        //     );
        // })
    },

    validate(req,res){
        console.log("validate",req.body, req.body.Email.includes("@"));
        if(req.body.Email.includes("@")){
            User.find({email:req.body.Email, password:req.body.Password}, function(err,user){
                if(user.length <= 0)
                    res.json({error: "Invalid account credentials!"})
                else{
                    VPC.findOne({owner:user[0]._id}, function(err,vpc){
                        if(err)
                            res.json({error: "couldn't find virtualPC!"})
                        else{
                            req.session.username = user[0].username;
                            req.session.email = user[0].email;
                            req.session.user_id = user[0]._id;
                            req.session.save();
                            //console.log(req.session, user);
                            res.json({success:true,data:user, virtualPC:vpc, session:req.session.id});
                        }
                    })
                }   
            })
        }else{
            User.find({username:req.body.Email, password:req.body.Password}, function(err,user){
                if(user.length <= 0)
                    res.json({error: "Invalid account credentials!"})
                else{
                    VPC.findOne({owner:user[0]._id}, function(err,vpc){
                        if(err)
                            res.json({error: "couldn't find virtualPC!"})
                        else{
                            req.session.username = user[0].username;
                            req.session.email = user[0].email;
                            req.session.user_id = user[0]._id;
                            req.session.save();
                           // console.log(req.session, user);
                            res.json({success:true,data:user, virtualPC:vpc, session:req.session.id});
                        }
                    })
                }             
            })
        }
    }   
}