import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';


export default React.createClass({
  displayName: 'rc-image',

  propTypes: {
    lazy: PropTypes.bool,
    defaultPic: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    threshold: PropTypes.number,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
  },

  getDefaultProps() {
    return {
      lazy: true,
      threshold: 0,
      prefixCls: 'rc-image',
      className: '',
    };
  },

  getInitialState() {
    return {
      visible: false,
      loaded: false,
      error: false,
    };
  },

  componentDidMount() {
    window.addEventListener('scroll', this._onWindowScroll);
    window.addEventListener('resize', this._onWindowScroll);
    this._onWindowScroll();
  },

  componentWillUnmount() {
    this._onVisible();
  },

  _onWindowScroll() {
    const bounds = ReactDom.findDOMNode(this).getBoundingClientRect();
    const hVisible = (bounds.left <= 0) || (bounds.left <= window.outerWidth + this.props.threshold);
    const vVisible = (bounds.top <= 0) || (bounds.top <= window.outerHeight + this.props.threshold);
    if (hVisible && vVisible) {
      this._onVisible();
    }
  },

  _onVisible() {
    window.removeEventListener('scroll', this._onWindowScroll);
    window.removeEventListener('resize', this._onWindowScroll);
    this.setState({
      visible: true,
    });
  },

  _onLoad() {
    this.setState({
      loaded: true,
    });
  },

  _onErr() {
    this.setState({
      error: true,
    });
  },

  render() {
    const {prefixCls, src, defaultPic, className, ...props} = this.props;
    const imgSrc = this.state.error ? defaultPic : src;
    if (this.state.visible) {
      props.src = imgSrc;
    }
    /** @todo pre loading class */
    const cls = `${prefixCls}  ${className} ${this.state.loaded ? prefixCls + '-loaded' : ''}`;
    return (<img onLoad={ this._onLoad } onError={ this._onErr } className={ cls } { ...props } />);
  },
});
