import React from 'react'
import Blank from '../Blank'
import { shallow, mount, render } from 'enzyme'

describe('black component test suite', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Blank />).contains(<div className="blank-container">Blank Component</div>)).toBe(true)
  })

  it('should be selectable by class "blank-container"', () => {
    expect(shallow(<Blank />).is('.blank-container')).toBe(true)
  })

  it('should mount in a full DOM', () => {
    expect(mount(<Blank />).find('.blank-container').length).toBe(1)
  })

  it('should render to static HTML', () => {
    expect(render(<Blank />).text()).toEqual('Blank Component')
  })
})

describe('black component test suite with snapshot', () => {
  const wrapper = shallow(<Blank />)
  expect(wrapper).toMatchSnapshot()
})
