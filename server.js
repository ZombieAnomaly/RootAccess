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
