import {
  login, logout
} from '../../actions/auth'

test('login generates login action with uid', () => {
  const uid = '2345'
  const action = login(uid)
  expect(action).toEqual({
    type: "LOGIN",
    uid
  })
})

test('logout generates logout action', () => {

  const action = logout()
  expect(action).toEqual({
    type: "LOGOUT"
  })
})
