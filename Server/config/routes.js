const mongoose = require('mongoose'),
      users = require('./../controllers/users.js');

module.exports = function(app){

    app.get('/', function (req, res) {
        //tasks.index(req,res);
    })

    app.get('/api', function (req, res) {
        res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    })

    app.post('/login', function(req, res) {
        users.validate(req,res)
    });

    app.post('/register', function(req, res) {
        users.register(req,res);
    });

    app.get('/checksession', function(req, res) {
        users.checkSession(req,res);
    });

    app.get('/users/:id/', function(req, res) {
        users.getUser(req,res);
    });

    app.get('/vpc/:ip/', function(req, res) {
        users.getVirtualPC(req,res);
    });

    app.get('/vpc/HD/:ip/', function(req, res) {
        users.getHardDrive(req,res);
    });

    // app.post('/tasks', function(req,res) {
    //     tasks.new(req,res);
    // })

    // app.put('/tasks/:id', function(req,res){
    //     tasks.update(req,res);
    // })

    // app.delete('/tasks/:id', function(req, res) {
    //     tasks.remove(req,res);
    // })
    
    // app.get('/tasks/:id', function(req,res){
    //     tasks.display(req,res);
    // })
} 