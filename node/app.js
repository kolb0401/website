/*jslint node: true */
'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 8081;


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
    layoutsDir: 'views/dist/views/layouts/',
    partialsDir: 'views/dist/views/partials/'
}));

// Locate the views
app.set('views', __dirname + '/views/dist/views');

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
app.get('*', function(request, response, next) {
    response.render('index');
});
