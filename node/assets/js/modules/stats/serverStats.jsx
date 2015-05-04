'use strict';

var React = require('react');
var io = require('socket.io-client');
var CpuStats = require('./cpuStats');
var MemStats = require('./memStats');

var component = React.createClass({
  getInitialState: function () {
    return {
      stats: null,
      socket: io.connect('http://localhost:8081')
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
        <CpuStats cpus={this.state.stats.cpus} />
        <MemStats free={this.state.stats.memory.free} used={this.state.stats.memory.used} />
      </section>
    );
  },

  componentDidMount: function (){
    this.state.socket.on('stats', function (stats){
      this.setState({
        stats: stats
      });
    }.bind(this));
  }
});

module.exports = component;
