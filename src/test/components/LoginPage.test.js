import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '../../components/LoginPage.jsx'

test('should render LoginPage', () => {
  const wrapper = shallow(<LoginPage />)
  expect(wrapper).toMatchSnapshot()
})

test('should call login on button click', () => {

  const login = jest.fn()
  const wrapper = shallow(<LoginPage login={login} />)
  wrapper.find('button').simulate('click')
  expect(login).toHaveBeenCalled()

})
