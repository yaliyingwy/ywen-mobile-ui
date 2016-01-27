/**
 * only require other specs here
 */
import '../assets/index.less';
import expect from 'expect.js';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'rc-ywen-mobile-ui';


describe('Modal', ()=> {
  let div;
  let component;
  beforeEach(()=> {
    div = document.createElement('div');
    document.body.appendChild(div);
    component = ReactDOM.render(<Modal>
      <p>content in Modal</p>
    </Modal>, div);
  });
  afterEach(()=> {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });
  it('render works', ()=> {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'rmc-picker-item').length).to.be(2);
  });
});
