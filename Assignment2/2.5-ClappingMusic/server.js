var port = 3006;

//node server set up
var express = require('express'); //import Express module

var app = express();//store the result of express(); in a variable called app
var server = app.listen(port);//open the port on the port

app.use(express.static('public'));

console.log("socket server is open on port: "+ port);

