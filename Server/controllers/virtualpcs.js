
var session = require('express-session');
const mongoose = require('mongoose'),
    VPC = mongoose.model('VirtualPc')

module.exports = {

    find(req,res){
        VPC.find({ip:req.body.IP}, function(err,vpc){
            res.json({'virtualPC':vpc});
        })
    },

    checkSession(req,res){
        console.log(req.session);
        if(req.session.email && req.session.username){
             res.json({session:true, data:req.session});return;
        }
        res.json({session:false});
    },

    new(req,res){
        
        VPC.find({ip:req.body.IP}, function(err,vpc){
            if(vpc.length > 0){res.json({error: "VPC already exists with that IP!"}); return;}
        });

        var vpc = new VPC({
            owner: rew.body.id,
            ip: req.body.IP,
            password: req.body.Password,
        });

        vpc.save(function(err, vpc) {
            if(err) // if there is an error console.log that something went wrong!
                res.json({error:err});
            else {// else console.log that we did well and then redirect to the root route
                res.json({success:true, data:vpc});
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
}