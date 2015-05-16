'use strict';
var React = require('react');
var frag = React.createClass({

  render: function () {
    return (
      <section id="footer" className="footer fluid-container">
        <div className="container">
            <div className="attribution">&#169;{new Date().getFullYear()} Jonathan Kolb</div>
        </div>
      </section>
    );
  }
});

module.exports = frag;
