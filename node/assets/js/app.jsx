var React = require('react');
var $ = require('jquery');

// START Basic Foundation setup
$(document).foundation();
var offCanvasMenuComponent = require('offCanvasMenu');
// END

//START REACT ROUTER
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

//APP PAGES
var Index = require('react/page/index');
var NotFound = require('react/page/404');


var routes = (
  <Route name="app" path="/">
    <DefaultRoute handler={Index} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('page-content'));
});
