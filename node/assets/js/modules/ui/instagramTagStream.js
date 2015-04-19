/**
 * Ui component to append new instagram photos to the page.
 *
 *
 * TRIGGERS:
 * =========
 * @event data:instagramTagStream:register
 * @param {String} tag the tag to stream new photos for.
 *
 * LISTENS TO:
 * ===========
 * @event data:instagramTagStream:new:media
 * @param {Object} data
 *  @param {String} tag the tag that the accompanying media item is related to.
 *  @param {Object} media the new media item returned from the instagram api.
 *                  for more details on objects content see the the Instagram API.
 *
 */
var defineComponent = require("flight/lib/component");
var $ = require("jquery");

var component = defineComponent(offCanvasMenu);

function offCanvasMenu() {
  this.attributes({
    tag: '',

    /**
     * The time is ms to reregister a tag for this view.
     */
    reregisterTimeout: 10000,

    submitSelector: '.do_submit',

    inputSelector: '.tag_input',

    resultsSelector: '.instagram-stream-results',

    EV_REGISTER: 'data:instagramTagStream:register',

    EV_NEW_MEDIA: 'data:instagramTagStream:new:media'
  });

  /**
   * Appends an image to the page.
   * @param {Event} event
   * @param {Object} data
   *  @param {String} tag the tag that the media relates to
   *  @param {Object} media the instagram media object
   */
  this.newMedia = function (event, data) {
    if (data.tag !== this.attr.tag || data.media.type !== 'image') {
      return;
    }
    var media = data.media;
    var html =
    '<div class="instagram-feed-item">' +
      '<img class="instagram-feed-item__image" src="' + media.images.standard_resolution.url + '"/>' +
      '<div class="instagram-feed-item__caption">' + media.caption.text + '</div>' +
    '</div>';
    this.select('resultsSelector').prepend(html);
  };

  this.onSubmit = function (event) {
    event.preventDefault();
    var value = this.select('inputSelector').val();
    if (value && value !== '') {
      this.attr.tag = value;
    }
    $('body').trigger(this.attr.EV_REGISTER, this.attr.tag);
    this.enableReregister();
  };

  this.enableReregister = function () {
    var self = this;
    setInterval(function () {
      $('body').trigger(self.attr.EV_REGISTER, self.attr.tag);
    }, this.attr.reregisterTimeout);
  };

  this.after('initialize', function () {
    this.on('body', this.attr.EV_NEW_MEDIA, this.newMedia);
    this.on(this.select('submitSelector'), 'click', this.onSubmit);
  });
}
module.exports = component;
