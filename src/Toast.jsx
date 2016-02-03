// export this package's api
import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'rc-toast',

  propTypes: {
    content: PropTypes.string.isRequired,
    showTime: PropTypes.number,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    type: PropTypes.oneOf(['error', 'success', 'info']),
    position: PropTypes.oneOf(['top', 'center', 'bottom']),
  },

  getDefaultProps() {
    return {
      type: 'info',
      position: 'center',
      showTime: 1500,
      prefixCls: 'rc-toast',
      className: '',
    };
  },


  render() {
    const {prefixCls, className} = this.props;
    let cls = prefixCls + ' ' + className;
    switch (this.props.position) {
      case 'top':
        cls += ` ${prefixCls}-top`;
        break;
      case 'bottom':
        cls += ` ${prefixCls}-bottom`;
        break;
      default: cls += ` ${prefixCls}-center`;
    }
    return (<div className={cls}>
      {(()=> {
        if (!Object.is(this.props.type, 'info')) {
          let iconCls = this.props.prefixCls + '-icon';
          if (Object.is(this.props.type, 'success')) {
            iconCls += ` ${iconCls}-success`;
          } else {
            iconCls += ` ${iconCls}-error`;
          }
          return <i className={iconCls}></i>;
        }
      })()}
      <p className={this.props.prefixCls + '-content'}>{this.props.content}</p>
      </div>
    );
  },
});
