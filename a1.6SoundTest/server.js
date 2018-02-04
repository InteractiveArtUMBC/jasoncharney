var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("my socket server is running.");
