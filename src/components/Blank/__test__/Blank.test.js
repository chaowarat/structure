import React from 'react';
import Blank from '../Blank';
import { shallow, mount, render } from 'enzyme';

describe('black component test suite', function () {
  it('should render without throwing an error', () => {
    expect(shallow(<Blank />).contains(<div className="blank-container">Blank Component</div>)).toBe(true);
  });

  it('should be selectable by class "blank-container"', function () {
    expect(shallow(<Blank />).is('.blank-container')).toBe(true);
  });

  it('should mount in a full DOM', function () {
    expect(mount(<Blank />).find('.blank-container').length).toBe(1);
  });

  it('should render to static HTML', function () {
    expect(render(<Blank />).text()).toEqual('Blank Component');
  });
});
