import React from 'react'
import App from 'Containers/App'
import { shallow } from 'enzyme'

it('renders correctly', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('header')).toHaveLength(1)
})
