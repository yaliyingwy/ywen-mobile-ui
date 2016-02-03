/**
 * only require other specs here
 */
import '../assets/index.less';
import 'babel-core/polyfill';
import expect from 'expect.js';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import {Modal} from '../lib/index';


describe('Modal', ()=> {
  let div;
  let component;
  beforeEach(()=> {
    div = document.createElement('div');
    document.body.appendChild(div);
    component = ReactDOM.render(<Modal show={true}>
      <p>content in Modal</p>
    </Modal>, div);
  });
  afterEach(()=> {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it('render works', ()=> {
    const mask = TestUtils.findRenderedDOMComponentWithClass(component, 'rc-modal-mask');
    expect(mask.clientLeft).to.be(0);
    expect(mask.clientTop).to.be(0);
    expect(mask.clientWidth).not.lessThan(document.body.clientWidth);
    expect(mask.clientHeight).not.lessThan(document.body.clientHeight);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'p').length).to.be(1);
  });

  it('without mask', ()=> {
    component = ReactDOM.render(<Modal show={true} withMask={false}>
      <p>content in Modal</p>
    </Modal>, div);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'rc-modal-mask').length).to.be(0);
  });

  it('trigger touch mask function', ()=> {
    let str = 'before';
    const touchFunc = ()=> str = 'after';
    component = ReactDOM.render(<Modal show={true} withMask={true} touchMask={touchFunc}>
      <p>content in Modal</p>
    </Modal>, div);
    const masks = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rc-modal-mask');
    expect(masks.length).to.be(1);
    expect(str).to.be('before');

    // click mask
    TestUtils.Simulate.click(masks[0]);
    expect(str).to.be('after');
  });
});
