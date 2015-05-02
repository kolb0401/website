'use strict';
//Needed for es5 compatablity
require('babel/polyfill');

var React = require('react');
var $ = require('jquery');
var ga = require('ga');

// START Basic Foundation setup
$(document).foundation();
var offCanvasMenuComponent = require('offCanvasMenu');
offCanvasMenuComponent();
// END

//START REACT ROUTER
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

//APP PAGES
var Index = require('page/index');
var NotFound = require('page/404');


var routes = (
  <Route name='JonthanKolb' path="/">
    <DefaultRoute name='Home' handler={Index} />
    <NotFoundRoute name='404' handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler/>, document.getElementById('page-content'));

  var title = [];

  for (let route of (state.routes)) {
    title.push(route.name);
  }


  ga('send', { 'hitType': 'pageview', 'page': state.path, 'title': title.join(' - ')});
});
