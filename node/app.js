'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var InstagramStream = require('./instagramTagStream');
var creds = require('./instagramCreds');
var port = 8081;
var instagramStream = new InstagramStream(creds);

/*
 * Start it up
 */
server.listen(process.env.PORT || port);
console.log('Express started on port ' + port);




/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

app.engine('handlebars', exphbs({
    // Default Layout and locate layouts and partials
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/'
}));

// Locate the views
app.set('views', __dirname + '/views');

// Locate the assets
app.use(express.static(__dirname + '/assets'));

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {

} else {

}

// Set Handlebars
app.set('view engine', 'handlebars');



/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});

// Index Page
app.get('/instagram-stream', function(request, response, next) {
    response.render('instagramStream');
});

/**
 * Instagram feed via sockets io
 */
var instagramIoEmiter = io.of('/instagram/recent/tag');

instagramIoEmiter.on('connection', function (socket) {
  console.log("Instagram Socket connected");

  socket.on('registerTag', function (data) {
    console.log("Registering tag: " + data);
    socket.join(data);
    instagramStream.addTag(data);
  });
});

instagramStream.on('tag', function (data) {
  for (var media in data.content) {
    var response = {
      tag: data.tag,
      media: data.content[media]
    };
    instagramIoEmiter.to(data.tag).emit('tag', response);
  }
});
