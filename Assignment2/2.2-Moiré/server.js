var express = require('express');
var port = 3000;
var app = express();
var server = app.listen(port);

app.use(express.static('public'));

console.log("Server is running on port:"+port);
