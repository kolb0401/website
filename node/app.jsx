/*jslint node: true */
'use strict';

/*
 * Express Dependencies
 */
require('babel/register');
var React = require('react');
var express = require('express');
var compression = require('compression');
var os = require('os');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8081;
var statisticsRoom = 'stats';


/*
 * Start it up
 */
server.listen(port);
console.log('Express started on port ' + port);




/*
 * Use Handlebars for templating
 */
var exphbs = require('express-handlebars');
var hbs;

// For gzip compression
app.use(compression());


app.engine('handlebars', exphbs({
    // Default Layout and locate layouts and partials
    defaultLayout: 'main',
    layoutsDir: 'views/dist/views/layouts/',
    partialsDir: 'views/dist/views/partials/'
}));

// Locate the views
app.set('views', __dirname + '/views/dist/views');

// Locate the assets
app.use(express.static(__dirname + '/assets'));

// Set Handlebars
app.set('view engine', 'handlebars');

var env = 'development';

if (process.env.RACK_ENV === 'production') {
  env = 'production';
}

var pageData = {
  socketPath: env === 'production' ? '/' : 'http://localhost:' + port + '/'
};

/*
 * Routes
 */

 //START REACT ROUTER
 var Router = require('react-router');
 var routes = require('./assets/js/modules/routes');


// Index Page
app.get('*', function(request, response, next) {
  Router.run(routes, request.path, function (Handler, state) {
    var content = React.renderToString(<Handler />);

    response.render('index', {
      content: content,
      pageData: JSON.stringify(pageData)
    });
  });
});

io.on('connection', function (socket) {
  socket.join(statisticsRoom);
});

//TODO vet the update interval
setInterval(function () {
  var stats = {
    currentUsers: io.sockets.sockets.length,
    memory: {
      free: os.freemem(),
      used: os.totalmem() - os.freemem()
    },
    load: os.loadavg(),
    cpus: os.cpus(),
    upTime: os.uptime()
  };

  io.to(statisticsRoom).emit('stats', stats);
}, 2000);
