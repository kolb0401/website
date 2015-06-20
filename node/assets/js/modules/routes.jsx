'use strict';
var React = require('react');
//START REACT ROUTER
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

//APP PAGES
var Index = require('./page/index');
var NotFound = require('./page/404');
var StyleGuide = require('./page/styleGuide');

var routes = (
  <Route name='Jonathan Kolb' path="/">
    <DefaultRoute name='Home' handler={Index} />
    <Route name='Style Guide' path="style-guide" handler={StyleGuide} />
    <NotFoundRoute name='404' handler={NotFound} />
  </Route>
);

module.exports = routes;
