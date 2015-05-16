'use strict';
var React = require('react');
var ServerStats = require('stats/serverStats');
var SocialBar = require('page/frag/socialBar');
var Bio = require('page/frag/bio');
var Blog = require('page/frag/blog');
var Footer = require('page/frag/footer');

var IndexPage = React.createClass({

  render: function () {
    return (
      <section className="index-page">
        <section className="main-section fluid-container">
          <div className="text-mask"></div>
          <div className="text-container">
            <h1 className="title">Hi I'm Jonathan</h1>
            <p className="content animated fadeIn-down">
              Software Engineer, Hockey Enthusiast, Talentless Writer.
            </p>
          </div>

        </section>
        <SocialBar/>
        <Bio/>
        <Blog/>
        <section className="fluid-container">
          <h2>Real Time Server Information</h2>
            <ServerStats {...this.props} />
        </section>

        <Footer/>
      </section>
    );
  }
});

module.exports = IndexPage;
