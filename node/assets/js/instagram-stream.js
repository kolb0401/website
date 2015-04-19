var $ = require('jquery');

var offCanvasMenuComponent = require('ui/offCanvasMenu');
var instagramTagDataComponent = require('data/instagramTagStream');
var instagramUiComponent = require('ui/instagramTagStream');

$(document).foundation();
offCanvasMenuComponent.attachTo('body');
instagramTagDataComponent.attachTo('body');
instagramUiComponent.attachTo('.instagram-stream');
