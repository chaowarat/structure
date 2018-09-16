import React from 'react';
import Example from '../Example';
import { shallow, mount } from 'enzyme';

describe('example component test suite', function () {
  it('renders without crashing', () => {
    shallow(<Example />);
  });

  it('renders with props without crashing', () => {
    shallow(<Example name="chaow" />);
  });

  it('should have "Example Component" inside body html', () => {
    const wrapper = mount(
      <Example />
    );
    const body = wrapper.find('.example-body');
    expect(body.text()).toBe('Example Component');
    wrapper.unmount();
  });

  it('should have button with Save text', () => {
    const wrapper = mount(
      <Example />
    );

    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.text()).toBe('Save');

    wrapper.unmount();
  });

  it('should be selectable by class "example-container"', function () {
    expect(shallow(<Example />).is('.example-container')).toBe(true);
  });

  it('should have "Hello!" as initial state pf "pre"', function () {
    const wrapper = shallow(<Example />);
    expect(wrapper.state('pre')).toBe('Hello!');
  });
});
