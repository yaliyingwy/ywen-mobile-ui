import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { cssMultiple } from '../utils/funcUtil';
import { getDimensions } from '../utils/dimensionsUtil';

class Tab extends PureComponent {
  constructor(props) {
    super(props);
    this.cells = [];
    this.state = {
      positions: [],
    };
  }

  componentDidMount() {
    console.log(this.cells);
    setTimeout(() => {
      const positions = this.cells.map(cell => cell.offsetLeft);
      this.setState({
        positions,
      });
    }, 300);
  }

  render() {
    const { 
      tabs, 
      activeIndex, 
      clickTab,
      cellWidth,
      className,
      dimensions,
      ...rest 
    } = this.props;

    const { positions } = this.state;
    const avgWidth = dimensions.offsetWidth / tabs.length;
    const width = cellWidth || `${avgWidth}px`;
    const cells = tabs.map((tab, index) => {
      return (
        <div
          key={index}
          ref={(cell) => { this.cells[index] = cell; }}
          onClick={() => clickTab(index)}
          className={`tab-cell ${index === activeIndex ? 'active' : ''}`}
          style={{
            width,
          }}
        >
          <div>{tab}</div>
        </div> 
      );
    });
    return (
      <div className={`ywen-tab-container ${className}`} {...rest}>
        <div 
          className="tab-content needsclick" 
          style={{ width: cssMultiple(width, tabs.length) }}
          ref={(content) => { this.content = content; }}
        >
          {cells}
          <div className="tab-line" ref={(line) => { this.line = line; }} style={{ width, left: positions[activeIndex], opacity: positions.length > 0 ? 1 : 0 }} />
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  cellWidth: PropTypes.string,
  clickTab: PropTypes.func.isRequired,
  activeIndex: PropTypes.number,
  dimensions: PropTypes.shape({
    clientWidth: PropTypes.number,
    clientHeight: PropTypes.number,
    offsetWidth: PropTypes.number,
    offsetHeight: PropTypes.number,
  }),
  className: PropTypes.string,
};

Tab.defaultProps = {
  activeIndex: 0,
  cellWidth: null,
  dimensions: {
    clientWidth: 0,
    clientHeight: 0,
    offsetWidth: 0,
    offsetHeight: 0,
  },
  className: '',
};

export default getDimensions(Tab);
