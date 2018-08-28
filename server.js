const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var path = require('path');
const session = require('express-session');

const port = process.env.PORT || 3005;
var server = app.listen(port, () => console.log(`Listening on port ${port}`));
require('./server/config/mongoose.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'RootAccess',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}));

require('./server/config/routes.js')(app)



// mongoose.connect('mongodb://localhost/RootAccess');
// mongoose.Promise = global.Promise;
// mongoose.modelcopy('User', models.UserSchema); // We are setting this Schema in our Models as 'User'
// var User = mongoose.model('User') 


// // create a GET route
// app.get('/api', (req, res) => {
//   res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });

// app.post('/login', function(req, res) {
//     console.log("POST DATA", req.body);
//     // This is where we would add the user from req.body to the database.
//     res.json({data:req.body});
// });

// app.post('/register', function(req, res) {
//   console.log("Register DATA", req.body);
//   //var newUser = new User({name: req.body.name, age: req.body.age});
//   // This is where we would add the user from req.body to the database.
//   res.json({data:req.body});
// });



//--example Index.js--//

// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');

// var path = require('path');
// var server = app.listen(8333, function() {console.log("listening on port 8333");});

// require('./server/config/mongoose.js')

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, './client/static')));
// app.use(bodyParser.json());

// app.set('views', path.join(__dirname, './client/views'));
// app.set('view engine', 'ejs');

// require('./server/config/routes.js')(app)