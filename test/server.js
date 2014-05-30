var path = require('path');
var express = require('express');

var app = express();
app.use('/js/bin', express.static(path.resolve(__dirname, '../bin/')));
app.use('/js/src', express.static(path.resolve(__dirname, '../src/')));
app.use(express.static(__dirname));
app.listen(1337);

console.log('Test server running');
