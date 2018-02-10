import authReducer from '../../reducers/auth'

test('should set default state', () => {
  const state = authReducer(undefined, { type: "@@INIT" })
  expect(state).toEqual({})
})

test('should log user in', () => {
  const action = {
    type: 'LOGIN',
    uid: '2345'
  }
  const state = authReducer(undefined, action)
  expect(state.uid).toBe(action.uid)
})

test('should log user out', () => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer(undefined, action)
  expect(state.uid).toBeUndefined()
})
