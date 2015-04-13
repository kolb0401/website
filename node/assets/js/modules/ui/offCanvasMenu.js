/**
 * This component is common to most pages and initalizes the Foundation off canvas
 * menu from http://zurb.com/building-blocks/foundation-multi-level-0ff-canvas
 *
 * This requires $(document).foundation() to be called first.
 *
 * This component should be attached to the highest level of the dom possible.
 *
 */
var defineComponent = require("flight/lib/component");
var $ = require("jquery");

var component = defineComponent(offCanvasMenu);

function offCanvasMenu() {
  this.attributes({
    subMenuSelector: '.off-canvas-submenu',
    subMenuCallSelector: '.off-canvas-submenu-call'
  });

  this.after('initialize', function () {
    this.select('subMenuSelector').hide();

    var self = this;
    this.select('subMenuCallSelector').click(function(event) {
      event.preventDefault();
      var icon = $(this).parent().next(self.attr.subMenuSelector).is(':visible') ? '+' : '-';

       $(this).parent().next(self.attr.subMenuSelector).slideToggle('fast');

       $(this).find('span').text(icon);

    });
  });
}
module.exports = component;
