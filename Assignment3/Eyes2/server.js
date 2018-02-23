var portNumber = 3000;
var express = require('express');
var app = express();
var server = app.listen(portNumber);
app.use(express.static('public'));

