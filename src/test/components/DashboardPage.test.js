
import React from 'react'
import { shallow } from 'enzyme'
import DashboardPage from '../../components/DashboardPage.jsx'

test('should render DashboardPage', () => {
  const wrapper = shallow(<DashboardPage />)
  expect(wrapper).toMatchSnapshot()
})
