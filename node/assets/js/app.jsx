'use strict';
//Needed for es5 compatablity
require('babel/polyfill');

var React = require('react');
var $ = require('jquery');
var ga = require('ga');
var io = require('socket.io-client');
var PageData = require('pageData');

//Start the socket
var Socket = io.connect(PageData.socketPath);


//START REACT ROUTER
var Router = require('react-router');

//APP PAGES
var Index = require('page/index');
var NotFound = require('page/404');
var StyleGuide = require('page/styleGuide');


var routes = require('routes');

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler socket={Socket}/>, document.getElementById('page-content'));

  var title = [];

  for (let route of (state.routes)) {
    title.push(route.name);
  }

  document.title = title.join(' - ');
  ga('send', { 'hitType': 'pageview', 'page': state.path, 'title': title.join(' - ')});
});
