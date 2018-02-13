//streaming experiment
//https://www.npmjs.com/package/socket.io-stream
var port = 7000;
var connectedUsers = new Array();
var express = require('express'); //import Express module
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs');

var app = express();//store the result of express(); in a variable called app
var server = app.listen(port);//open the port on the port

app.use(express.static('public'));

console.log("socket server is open on port: "+ port);

var socket = require('socket.io');//import socket package

var io = socket(server);//use the server as a socket

var readableStream = fs.createReadStream('testtext.txt');

io.sockets.on('connection', function (socket){
    // ss(socket).emit('file', function(stream) {
    //     stream.write(readableStream);
    //   });
    ss(socket).on('webcam',function(stream))
    });  
