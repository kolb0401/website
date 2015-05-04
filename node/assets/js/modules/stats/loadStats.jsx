'use strict';

var React = require('react');
var BarChart = require('react-chartjs').Bar;

/**
 * This component will render a bar chart visualizing the system load averages.
 *
 */
var component = React.createClass({

  getDefaultProps: function (){
    return {
      load: [0, 0, 0]
    };
  },

  render: function() {
    var data = {
      labels: ['1-Minute', '5-Minute', '15-Minute'],
      datasets: [
        {
          label: 'System Load',
           fillColor: '#81AE9D',
           strokeColor: '#81AE9D',
           highlightFill: '#81AE9D',
           highlightStroke: '#81AE9D',
           data: this.props.load
        }
      ]
    };

    return (
      <div className='load'>
        <div className='load-data__title'>Server Load</div>
        <div className='load-data__chart'>
          <BarChart data={data} />
        </div>
        <div className='load-data__chart_name'>Server Load Average</div>

      </div>

    );
  }
});

module.exports = component;
