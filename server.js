// server.js
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var path = require('path');
var Session = require("express-session");
var morgan = require('morgan');


var server = require('http').createServer(app);


var default_route  = require('./routes/default');
var config = require('./config');

app.use(express.static(path.join(__dirname, 'public')));
app.use(Session(config.session));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.locals.appTitle = config.appTitle;


app.use('/', default_route);

// START THE SERVER
server.listen(config.server_port,config.server_ip_address, function () {
  console.log('Magic happens on port ' + config.server_port);
});
