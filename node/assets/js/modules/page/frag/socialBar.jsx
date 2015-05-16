'use strict';
var React = require('react');
var $ = require('jquery');
var frag = React.createClass({

  render: function () {
    return (
      <section id="social-bar" className="fluid-container">
        <div className="container">
            <a href="https://www.linkedin.com/pub/jonathan-kolb/27/376/7a5" className="fi-social-linkedin large social-icon"></a>
            <a href="https://twitter.com/kolb0401" className="fi-social-twitter large social-icon"></a>
            <a href="https://github.com/fumblesandfriends" className="fi-social-github large social-icon"></a>
        </div>
      </section>
    );
  }
});

module.exports = frag;
