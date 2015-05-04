'use strict';

var React = require('react');
var PieChart = require('react-chartjs').Pie;

var COLORS = {
  free: '#2b83ba',
  used: '#d7191c'
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
      free: 1,
      used: 1
    };
  },

  render: function() {
    var total = this.props.free + this.props.used;
    var freePercent = (this.props.free / total) * 100;
    var usedPercent = (this.props.used / total) * 100;

    var data = [];
    data.push({
      label: 'Free',
      value: freePercent,
      color: COLORS.free
    });

    data.push({
      label: 'Used',
      value: usedPercent,
      color: COLORS.used
    });

    return (
      <div className='memory'>
        <div className='memory-data__title'>Memory Usage</div>
        <div className='memory-data__chart'>
          <PieChart data={data} />
        </div>
      </div>

    );
  }
});

module.exports = component;
