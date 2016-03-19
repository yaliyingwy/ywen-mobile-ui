import React, { PropTypes } from 'react';
import ErrorPic from '../assets/img/default.png';

export default React.createClass({
  displayName: 'rc-image',

  propTypes: {
    lazy: PropTypes.bool,
    errorPic: PropTypes.string,
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
      errorPic: ErrorPic,
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

  _checkVisible() {
    if (!this.state.visible) {
      this._onWindowScroll();
    }
  },

  _onWindowScroll() {
    const { container } = this.refs;
    const rect = container.getBoundingClientRect();

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
    const {
      prefixCls,
      src,
      errorPic,
      className,
      ...props,
    } = this.props;
    const { visible, loaded, error } = this.state;

    const cls = `${prefixCls}  ${className}`;
    const imgCls = prefixCls + (loaded ? '-loaded' : '-unload');
    if (visible) {
      props.src = error ? errorPic : src;
    }

    return (<div ref="container" className={ cls }>
        {(() => {
          if (!visible) {
            return <div className={ `${prefixCls}-preloader` }></div>;
          }
        })()}
        <img className={ imgCls } onLoad={ this._onLoad } onError={ this._onErr } { ...props } />
      </div>);
  },
});
