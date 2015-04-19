/**
 * A streaming wrapper for recent tags in the instagram api.
 */
var util = require("util");
var Writable = require('stream').Writable;

var TAG_TYPE = "tag";

var Instagram = function (creds) {
  if(!(this instanceof Instagram)) {
    return new Instagram(creds);
  }

  if (!creds.client_id || !creds.client_secret) {
    throw "Instagram Credentials incorrect";
  }

  //This is a mapping of tag to max id so we do not pull the same images more than once.
  this.tags = {};

  //Try and load new photos every 5 seconds
  this.pollTime = 5000;

  //The TTL for expiring tags
  this.tagTtl = 20000;

  this.instagramClient = require('instagram-node').instagram();
  this.instagramClient.use({
    'client_id': creds.client_id,
    'client_secret': creds.client_secret
  });

  Writable.call(this, {objectMode: true})
  var self = this;
  setInterval(function (){
    self.fetch();
  }, this.pollTime);

}

util.inherits(Instagram, Writable);

/**
 * This method will add a tag to the list of tags that this instance of instagram will poll.
 * If the tag is already being tracked this will do nothing.
 * @param {String} tag the tag name to track.
 */
Instagram.prototype.addTag = function (tag) {
  if (!this.tags[tag]) {
    this.tags[tag] = {
      ttl: new Date().getTime()
    };
  } else {
    this.tags[tag].ttl = new Date().getTime();
  }
};

/**
 * This function loops through the currently registered tags and removes the
 * tags that should be expired.
 */
Instagram.prototype.cleanupExpiredTags = function (){
  var expired = [];
  var time = new Date().getTime();
  for (var tag in this.tags) {
    if (time - this.tags[tag].ttl > this.tagTtl) {
      expired.push(tag);
    }
  }

  for (var index in expired) {
    delete this.tags[expired[index]];
  }
};

/**
 * This method will remove tags that we are serching from the list.
 */
Instagram.prototype.removeTag = function (tag) {
  delete this.tags[tag];
};

/**
 * This implementation of the write method will emit a tag one at a time if it
 * is present.
 */
Instagram.prototype._write = function (data, encoding, done) {
  if (data.type === TAG_TYPE && data.content instanceof Array && data.content.length) {
    this.emit(TAG_TYPE, data);
  }
  done();
};

Instagram.prototype.fetch = function () {
  this.cleanupExpiredTags();
  var self = this;
  for (var tag in this.tags) {
    var options = {};
    if (this.tags.hasOwnProperty(tag)) {
      if (this.tags[tag].pageData) {
        options.min_tag_id = this.tags[tag].pageData.min_tag_id;
      }
    }
    this.instagramClient.tag_media_recent(tag, options, function(err, medias, pagination, remaining, limit) {
      if (err) {
        return;
      }
      var emited = {
        type: TAG_TYPE,
        tag: tag,
        content: medias
      };
      self.tags[tag].pageData = pagination;
      self.write(emited);
    });


  }
};

module.exports = Instagram;
