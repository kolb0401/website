var $ = require('jquery');

var offCanvasMenuComponent = require('ui/offCanvasMenu');

$(document).foundation();
offCanvasMenuComponent.attachTo('body');

$('.title').fadeIn();
$('.content').fadeIn();
