'use strict';
var React = require('react');
var $ = require('jquery');
var frag = React.createClass({

  render: function () {
    return (
      <section id="blog" className="footer fluid-container">
        <div className="text-mask"></div>
        <div className="container">
            <h2>Talentless Writer</h2>
            <p>
              I write about the new technologies and development approaches I come across.
              Currently most of my writing centers around new frontend technologies and
              the Java Spring ecosystem. My blog also contains brief summaries
              of my experiences experimenting with new technologies in my free time.
            </p>
            <div>
              <a href="http://blog.jonathankolb.com">Read All About It</a>
            </div>

        </div>
      </section>
    );
  }
});

module.exports = frag;
