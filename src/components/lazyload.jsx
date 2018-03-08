import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {
  inViewport,
  getScrollParent,
} from '../utils/domUtil';

// 高阶组件, 考虑到有可能有需要包装一个现成的component的场景
export function lazy(WrappedComponent, options = { threshold: 0, lazyload: null }) {
  class Lazyload extends PureComponent {
    constructor(props) {
      super(props);
      this.onWindowScroll = this.onWindowScroll.bind(this);
      this.attachScrollListener = this.attachScrollListener.bind(this);
      this.dettachScrollListener = this.dettachScrollListener.bind(this);
    }

    componentDidMount() {
      const { lazyload } = this.props;
      if (lazyload) {
        this.attachScrollListener();
        setTimeout(this.onWindowScroll, 500);
      }
    }

    componentWillUnmount() {
      this.dettachScrollListener();
    }

    onWindowScroll() {
      const el = ReactDom.findDOMNode(this);
      const parent = getScrollParent(el);
      const { threshold } = this.props;

      if (inViewport(el, parent, { top: threshold, left: threshold })) {
        this.props.lazyload();
        this.dettachScrollListener();
      }
    }

    attachScrollListener() {
      window.addEventListener('scroll', this.onWindowScroll, true);
      window.addEventListener('resize', this.onWindowScroll);
    }

    dettachScrollListener() {
      window.removeEventListener('scroll', this.onWindowScroll, true);
      window.removeEventListener('resize', this.onWindowScroll);
    }

    render() {
      const { lazyload, threshold, ...rest } = this.props;
      return <WrappedComponent {...rest} />;
    }
  }

  Lazyload.propTypes = {
    threshold: PropTypes.number,
    lazyload: PropTypes.func,
  };

  Lazyload.defaultProps = {
    threshold: options.threshold,
    lazyload: options.lazyload,
  };

  Lazyload.displayName = `Lazyload-${WrappedComponent.displayName || WrappedComponent.name || 'Component'}`;
  
  return Lazyload;
}

export default lazy('div');
