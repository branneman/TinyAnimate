var fs = require('fs');
var path = require('path');
var express = require('express');

var app = express();
app.use('/bin', express.static(path.resolve(__dirname, '../bin/')));
app.use('/src', express.static(path.resolve(__dirname, '../src/')));
app.get('/', function(req, res) {
    var html = fs.createReadStream(__dirname + '/test-page.html');
    html.pipe(res);
});
app.listen(1337);

console.log('Test server running');
