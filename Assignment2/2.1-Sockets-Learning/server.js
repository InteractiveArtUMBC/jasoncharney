var port = 3000;
var connectedUsers = new Array();
var numConnections;
//node server set up
var express = require('express'); //import Express module

var app = express();//store the result of express(); in a variable called app
var server = app.listen(port);//open the port on the port

app.use(express.static('public'));

console.log("socket server is open on port: "+ port);

var socket = require('socket.io');//import socket package

var io = socket(server);//use the server as a socket

io.sockets.on('connection', function (socket){
  var socketid = socket.id;
  console.log('new connection: '+ socketid);
  connectedUsers.push(socketid);
  
  numConnections = connectedUsers.length;

  var i = connectedUsers.indexOf(socketid);
  console.log(numConnections);
  socket.emit('hey',socketid);
  socket.emit('role',i);
  socket.on('mastersync',function(syncFrame){
    socket.broadcast.emit('sync',syncFrame);
  });
    socket.on('disconnect', function(socket){
      console.log('user disconnected: '+socketid);
      var remove = connectedUsers.indexOf(socketid);
      connectedUsers.splice(remove,1);
      console.log(connectedUsers.length);
    });
});

