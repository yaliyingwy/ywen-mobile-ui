import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SwitchableContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
  }

  componentDidMount() {
    /* eslint-disable */
    this.setState({ width: this.container.offsetWidth });
    /* eslint-enable */
  }

  render() {
    const { activeIndex, children, className } = this.props;
    const { width } = this.state;
    const style = {
      transform: `translate3D(-${width * activeIndex}px, 0px, 0px)`,
    };

    console.log(style);

    const cells = React.Children.map(children, Child => React.cloneElement(Child, { style: { width, height: '100%' } }));

    return (
      <div ref={(container) => { this.container = container; }} className={`ywen-switchable-content ${className}`}>
        <div className="content-wraper" style={style}>
          {cells}
        </div>
      </div>
    );
  }
}

SwitchableContent.propTypes = {
  activeIndex: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

SwitchableContent.defaultProps = {
  activeIndex: 0,
  className: '',
};

export default SwitchableContent;
