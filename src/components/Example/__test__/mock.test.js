import React from 'react';
import Example from '../Example';
import { shallow } from 'enzyme';

const clickFn = jest.fn();

describe('example component test suite bu mocking', function () {
  beforeEach(() => {
    global.sessionStorage = jest.fn();
    global.sessionStorage.setItem = jest.fn();
  });

  it('button click should call onSaveFinish property', () => {
    const wrapper = shallow(<Example onSaveFinish={clickFn} />);
    expect(clickFn).not.toHaveBeenCalled();
    wrapper.find('button').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });

  it('button click should call onSaveFinish (call directly instant)', () => {
    const wrapper = shallow(<Example onSaveFinish={clickFn} />);
    const instance = wrapper.instance();
    instance.onSaveClick();
    expect(clickFn).toHaveBeenCalled();
  });
});