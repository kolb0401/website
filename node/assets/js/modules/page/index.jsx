'use strict';
var React = require('react');
var $ = require('jquery');
var IndexPage = React.createClass({

  render: function () {
    return (
      <section className="index-page">
        <div className="main-section container">
            <h1 className="title">Hi I'm Jonathan</h1>
            <p className="content">This is the start of my website.
              See the <a href="http://blog.jonathankolb.com">blog</a> for updates
            </p>
        </div>
      </section>
    );
  },

  componentDidMount: function () {
    if (this.isMounted()){
      $('.index-page').find('.title,.content').fadeIn();
    }
  }
});

module.exports = IndexPage;
