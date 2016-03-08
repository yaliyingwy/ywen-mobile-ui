import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';

export default React.createClass({
  displayName: 'rc-image',

  propTypes: {
    lazy: PropTypes.bool,
    errorPic: PropTypes.string.isRequired,
    placeholderPic: PropTypes.string.isRequired,
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
      visible: !this.props.lazy,
      loaded: false,
      error: false,
    };
  },

  componentDidMount() {
    if (this.props.lazy) {
      window.addEventListener('scroll', this._onWindowScroll, true);
      window.addEventListener('resize', this._onWindowScroll);
      this._onWindowScroll();
    }
  },

  componentWillUnmount() {
    if (this.props.lazy) {
      this._onVisible();
    }
  },

  _onWindowScroll() {
    const el = ReactDom.findDOMNode(this);
    const rect = el.getBoundingClientRect();

    const hVisible = rect.left <= 0 || rect.left < window.innerWidth + this.props.threshold;
    const vVisible = rect.top <= 0 || rect.top < window.innerHeight + this.props.threshold;

    if (hVisible && vVisible) {
      this._onVisible();
    }
  },

  _onVisible() {
    window.removeEventListener('scroll', this._onWindowScroll, true);
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
    const {prefixCls, src, placeholderPic, errorPic, className, ...props} = this.props;
    let imgSrc;
    if (this.state.error) {
      imgSrc = errorPic;
    } else if (this.state.visible) {
      imgSrc = src;
    } else {
      imgSrc = placeholderPic;
    }

    if (this.state.visible && imgSrc) {
      props.src = imgSrc;
    }
    /** @todo pre loading class */
    const cls = `${prefixCls}  ${className} ${this.state.loaded ? prefixCls + '-loaded' : ''}`;
    return (<img onLoad={ this._onLoad } onError={ this._onErr } className={ cls } { ...props } />);
  },
});
