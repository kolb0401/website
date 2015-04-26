var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    '*actions': 'notFound' // matches http://example.com/*
  }
});

module.exports = Router;
