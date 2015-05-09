'use strict';
var React = require('react');

var component = React.createClass({
  getDefaultProps: function () {
    return {
      users: 0
    };
  },

  render: function () {
    return (
      <div className="user">
        <div className="user-data">
          <div className="user-data__title">Current Users</div>
          <div className="user-data__value">{this.props.users}</div>
        </div>
      </div>
    );
  }
});

module.exports = component;
