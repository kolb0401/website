var $ = require('jquery');
var Backbone = require('backbone');
$(document).foundation();
var offCanvasMenuComponent = require('offCanvasMenu');
var Router = require('./router');
var appRouter = new Router();
var Index = require('react/page/index');
var NotFound = require('react/page/404');
var React = require('react');

appRouter.on('route:home', function () {
  React.render(<Index />, document.getElementById('page-content'));
});

appRouter.on('route:notFound', function (){
  React.render(<NotFound />, document.getElementById('page-content'));
});


// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start({pushState: true});
