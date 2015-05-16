'use strict';
var React = require('react');
var $ = require('jquery');
var frag = React.createClass({

  render: function () {
    return (
      <section id="blog" className="footer fluid-container">
        <div className="container">
            <h2>Talentless Writer</h2>
            <p>
              I write about the new technologies and development aproaches I come across.
              Currently most of my writing centers around new frontend technologies and
              the Java Spring ecosystem. My blog also contains brief summaries
              of my experiences experimenting with new technologies in my free time.
            </p>
            <button>Read All About It</button>
        </div>
      </section>
    );
  }
});

module.exports = frag;
