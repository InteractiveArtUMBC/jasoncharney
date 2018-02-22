var express = require('express');
var app = express();
var server = app.listen(3004);
app.use(express.static('public'));
