
var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser')
    bodyParser = require('body-parser');

var db = require('./restful/db'),
    apiRouter = require('./restful/api_router');

var app = express();

// 静态文件目录
//var staticDir = path.join(__dirname, 'site');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use( express.static( path.join(__dirname, 'site') ) );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use( express.errorHandler({ dumpExceptions: true, showStack: true}) )

app.set('port', process.env.PORT || 3050);

app.use('/', apiRouter);



db.connect(function(error){
    if (error) throw error;
});
app.on('close', function(errno) {
    db.disconnect(function(err) { });
});



app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
