import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import '../assets/styles/example.less';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.displayName = 'App';
  }
  render() {
    return (
      <div className="example">
      hello
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
