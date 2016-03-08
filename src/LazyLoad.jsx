import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';

export default React.createClass({
  displayName: 'rc-lazyload',

  propTypes: {
    children: PropTypes.node.isRequired,
    threshold: PropTypes.number,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    loadFunc: PropTypes.func,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
  },

  getDefaultProps() {
    return {
      threshold: 0,
      width: '100%',
      prefixCls: 'rc-lazy',
      className: '',
    };
  },

  getInitialState() {
    return {
      visible: false,
    };
  },

  componentDidMount() {
    window.addEventListener('scroll', this._onWindowScroll, true);
    window.addEventListener('resize', this._onWindowScroll);
    this._onWindowScroll();
  },

  componentWillUnmount() {
    this._onVisible();
  },

  _onWindowScroll() {
    const el = ReactDom.findDOMNode(this);
    const rect = el.getBoundingClientRect();

    const hVisible = rect.left <= 0 || rect.left < window.innerWidth + this.props.threshold;
    const vVisible = rect.top <= 0 || rect.top < window.innerHeight + this.props.threshold;

    if (hVisible && vVisible) {
      this._onVisible();
      this.props.loadFunc();
    }
  },

  _onVisible() {
    window.removeEventListener('scroll', this._onWindowScroll, true);
    window.removeEventListener('resize', this._onWindowScroll);
    this.setState({
      visible: true,
    });
  },


  render() {
    const { children, height, width, prefixCls, className } = this.props;
    const cls = `${prefixCls} ${this.state.visible ? prefixCls + '-loaded' : ''} ${className}`;
    let view;
    if (this.state.visible) {
      view = <div className={ cls }> { children } </div>;
    } else {
      view = (<div className={ cls } style={{ height, width }}></div>);
    }
    return view;
  },
});
