var defineComponent = require('flight/lib/component');
var io = require('socket.io-client');

/**
 * This component listens for events to provide instagram photos based on tags.
 *
 * LISTENS TO:
 * ===========
 * @event data:instagramTagStream:register
 * @param {String} tag the tag to stream new photos for.
 *
 * TRIGGERS:
 * =========
 * @event data:instagramTagStream:new:media
 * @param {Object} data
 *  @param {String} tag the tag that the accompanying media item is related to.
 *  @param {Object} media the new media item returned from the instagram api.
 *                  for more details on objects content see the the Instagram API.
 */
var component = defineComponent(InstagramTagStream);

function InstagramTagStream () {
  this.attributes({

    EV_REGISTER: 'data:instagramTagStream:register',

    EV_NEW_MEDIA: 'data:instagramTagStream:new:media',

    /**
     * The url to connect the socket.
     */
    url: '/instagram/recent/tag',
    /**
     * The message header to send to register a new tag
     */
    registerMsg: 'registerTag',

    /**
     * The message qualifier for incoming tags expected to be tag:<the tag>
     */
    listenMsgBase: 'tag'

  });

  /**
   * This function will register a tag with this component and setup the proper
   * functionality to listen for new instagram posts and emit an event everytime a
   * new on is detected.
   * @param {Event} event
   * @param {String} tag the tag to register eg: motivation
   */
  this.registerTag = function (event, tag) {
    this.attr.socket.emit(this.attr.registerMsg, tag);
  };

  /**
   * Creates a socket and adds listener for new tags to follow.
   */
  this.after('initialize', function () {
    var self = this;
    this.attr.socket = io.connect(this.attr.url);
    this.on(this.attr.EV_REGISTER, this.registerTag);
    this.attr.socket.on(this.attr.listenMsgBase, function (data) {
      self.trigger(self.attr.EV_NEW_MEDIA, data);
    });

  });
}
module.exports = component;
