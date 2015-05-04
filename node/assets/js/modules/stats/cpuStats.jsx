'use strict';

var React = require('react');
var DoughnutChart = require('react-chartjs').Doughnut;

var COLORS = {
  idle: '#81AE9D',
  irq: '#1E1E24',
  nice: '#DF928E',
  sys: '#21A179',
  user: '#DE291C'
};

/**
 * This component will render a doughnut chart illustrating the cpu cycles used.
 * it can be used as follows <Component cpus={cpus} />
 *
 */
var component = React.createClass({

  /**
   * @return {Object}
   *  @return {Array} cpus
   *    @return {Object} cpu
   *      @return {String} model
   *      @return {Number} speed
   *      @return {Object} times
   *        @return {Number} idle
   *        @return {Number} irq
   *        @return {Number} nice
   *        @return {Number} sys
   *        @return {Number} user
   */
  getDefaultProps: function (){
    return {
      cpus: []
    };
  },

  /**
  * @return {Object}
  *  @return {Array} cpus
  *    @return {Object} cpu
  *      @return {String} model
  *      @return {Number} speed
  *      @return {Array} chartData
  *        @return {Object} data
  *         @return {Number} value
  *         @return {String} label
  */
  getInitialState: function () {
    return {
      data: []
    };
  },

  render: function() {
    if (!this.props.cpus.length) {
      return (
        <div className="cpu-data"></div>
      );
    }

    return (
      <div className="cpu-data">
        <div className="cpu-data__title">CPU Usage</div>
        {this.state.data.map(function(cpu) {
          return (
            <div className="cpu">
              <div className="cpu__name">{cpu.model}</div>
              <div className='cpu__graph'>
                <DoughnutChart data={cpu.chartData} />
              </div>
              <div className="cpu__graph_title">CPU Cycle Usage</div>

            </div>
          );
        })}
      </div>

    );
  },

  componentDidMount: function (){
    var processedData = [];
    this.props.cpus.forEach(function (cpu) {
      let data = {};
      data.model = cpu.model;
      data.speed = cpu.speed;

      let points = [];

      for (var name in cpu.times) {
        points.push({
          label: name.charAt(0).toUpperCase() + name.slice(1),
          value: cpu.times[name],
          color: COLORS[name]
        });
      }

      data.chartData = points;

      processedData.push(data);
    });

    this.setState({
      data: processedData
    });
  }
});

module.exports = component;
