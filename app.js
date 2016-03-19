'use strict';

var express = require('express');
var app = express();

// 一个简单的 logger
app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    
    next();
});

app.use('/', express.static(__dirname + '/build'));

app.all('/upload', function(req, res){
    console.log(res);
    setTimeout(function() {
        res.status(200).send('hello there!');
    }, 5000);
    
});


var server = app.listen(3000, function() {
    console.log('Listening on  port %d', server.address().port);
});
