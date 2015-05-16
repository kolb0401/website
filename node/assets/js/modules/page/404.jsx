'use strict';
var React = require('react');
var $ = require('jquery');
var notFound = React.createClass({

  render: function () {
    return (
      <section className="404-page">
        <section className="main-section container">
            <h1 className="title">Hi I'm Jonathan</h1>
            <p className="content">This is a 404 page...</p>
        </section>
      </section>
    );
  }
});

module.exports = notFound;
