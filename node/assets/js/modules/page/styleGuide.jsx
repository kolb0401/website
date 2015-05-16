'use strict';
var React = require('react');
var page = React.createClass({
  render: function () {
    return (
      <section className="fluid-container" id="style-guide">
        <h1>Style Guide</h1>

        <section id="colors">
          <h2 className='style-guide__header'>Colors</h2>
          <div className='colors__containers'>
            <div className='colors__sample'>
              <div className='colors__sample-color pri-black'></div>
            </div>
            <div className='colors__sample'>
              <div className='colors__sample-color pri-grey'></div>
            </div>
            <div className='colors__sample'>
              <div className='colors__sample-color pri-white'></div>
            </div>
            <div className='colors__sample'>
              <div className='colors__sample-color sec-grey'></div>
            </div>
          </div>

        </section>

        <section id='fonts'>
          <h2 className='style-guide__header'>Fonts</h2>
          <div>
            <span>Primary Font: </span>
            <span className='pri-font'>font-family: 'Muli', sans-serif;</span>
          </div>

          <div>
            <span>Secondary Font: </span>
            <span className='sec-font'>font-family: 'Oswald', sans-serif;</span>
          </div>
        </section>

        <section id='headings'>
          <h2 className='style-guide__header'>Headings</h2>
          <div className='headings__container'>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
          </div>
        </section>

        <section id='Text'>
          <h2 className='style-guide__header'>Text</h2>

          <h4>Paragraph</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. </p>

          <h4>Span</h4>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>

        </section>
      </section>
    );
  }
});

module.exports = page;
