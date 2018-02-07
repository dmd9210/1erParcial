const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

// mongoose connection 
mongoose.connect("mongodb://localhost:27017/chat");
const db = mongoose.connection;

// mongo error
db.on('error', () => {console.error('connection error:')});

//use session for tracking logins
app.use(session({
  secret: 'Lab Web',
  resave: true,
  saveUninitialized: false,
  store : new MongoStore({
    url: "mongodb://localhost:27017/chat"
  })
}));

var http = require('http');
var server = http.Server(app);
var history = new Array();

app.use(express.static('client'));

var io = require('socket.io')(server);

io.on('connection', function (socket) { 
    socket.emit('history', history);
    socket.on('message', function (msg) {
       io.emit('message', `${msg.initials}: ${msg.message}`);
       history.push(`${msg.initials}: ${msg.message}`);
   });
});

server.listen(8080, function() {
    console.log('Chat server running');
})