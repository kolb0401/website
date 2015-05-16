'use strict';

var React = require('react');

var CpuStats = require('./cpuStats');
var MemStats = require('./memStats');
var LoadStats = require('./loadStats');
var UserStats = require('./userStats');

var component = React.createClass({
  getInitialState: function () {
    return {
      stats: null
    };
  },

  render: function() {
    if (!this.state.stats) {
      return (
        <section className="server-stats">
        </section>
      );
    }

    return (
      <section className="server-stats">
        <UserStats users={this.state.stats.currentUsers} />
        <LoadStats load={this.state.stats.load} />
        <CpuStats cpus={this.state.stats.cpus} />
        <MemStats free={this.state.stats.memory.free} used={this.state.stats.memory.used} />
      </section>
    );
  },

  componentDidMount: function (){
    this.props.socket.on('stats', function (stats){
      this.setState({
        stats: stats
      });
    }.bind(this));
  }
});

module.exports = component;
