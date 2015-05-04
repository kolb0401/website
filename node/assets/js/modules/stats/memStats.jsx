'use strict';

var React = require('react');
var PieChart = require('react-chartjs').Pie;

var COLORS = {
  free: '#21A179',
  used: '#DE291C'
};

/**
 * This component will render a pie chart illustrating the memory used.
 *
 */
var component = React.createClass({

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
        <div className='memory-data__chart_name'>Percent Used</div>
      </div>

    );
  }
});

module.exports = component;
