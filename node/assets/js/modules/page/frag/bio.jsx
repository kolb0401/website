'use strict';
var React = require('react');
var $ = require('jquery');
var frag = React.createClass({

  render: function () {
    return (
      <section id="bio" className="footer fluid-container">
        <div className="container">
            <h2>About Me</h2>
            <p>
              I am a full stack software engineer for Smarter Travel, a subsidiary of
              TripAdvisor. In my free time I am the volunteer IT Manager
              of <a href="http://ruffstartdogs.org">Ruff Start Rescue</a>, a 501c3 dog
              rescue organization. I love to experiment with new technologies,
              both frontend and backend, on my personal site. When I am not nerding out
              I enjoy watching hockey and driving fast cars.
            </p>
        </div>
      </section>
    );
  }
});

module.exports = frag;
