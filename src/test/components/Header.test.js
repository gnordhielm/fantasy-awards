import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../components/Header'

test('should render header correctly', () => {
  const wrapper = shallow(<Header logout={_ => _} />)
  expect(wrapper).toMatchSnapshot()

})

test('should call logout on button click', () => {

  const logout = jest.fn()
  const wrapper = shallow(<Header logout={logout} />)
  wrapper.find('button').simulate('click')
  expect(logout).toHaveBeenCalled()

})
