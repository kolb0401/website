/**
 * This code is common to all pages and initalizes the Foundation off canvas
 * menu from http://zurb.com/building-blocks/foundation-multi-level-0ff-canvas
 *
 * This requires $(document).foundation() to be called first.
 *
 */
'use strict';
var $ = require('jquery');

function offCanvasMenu() {
    $('.off-canvas-submenu').hide();

    $('.off-canvas-submenu-call').click(function(event) {
      event.preventDefault();
      var icon = $(this).parent().next('.off-canvas-submenu').is(':visible') ? '+' : '-';

       $(this).parent().next('.off-canvas-submenu').slideToggle('fast');

       $(this).find('span').text(icon);

    });
}
module.exports = offCanvasMenu;
