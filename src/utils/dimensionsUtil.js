import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';

const defaultDimensionFunc = (element) => {
  return {
    clientWidth: element.clientWidth,
    clientHeight: element.clientHeight,
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
  };
};

export function getDimensions(ComposedComponent, dimensionFunc = defaultDimensionFunc) {
  class Dimension extends PureComponent {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.state = {
        dimensions: {},
      };
    }

    componentDidMount() {
      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      const dimensions = dimensionFunc(findDOMNode(this.component));
      this.setState({ dimensions });
    }

    render() {
      const { dimensions } = this.state;
      return (
        <ComposedComponent 
          dimensions={dimensions} 
          ref={(component) => { this.component = component; }} 
          {...this.props} 
        />
      );
    }
  }
  return Dimension;
}
