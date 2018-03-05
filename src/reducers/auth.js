
const initialState = {
  uid: null,
  fullName: '',
  handle: '',
  leagues: []
}

export default (state=initialState, action) => {
  switch(action.type)
  {
    case 'LOGIN':
      return {
        ...state,
        ...action.user
      }
    case 'LOGOUT':
      return {
        ...initialState
      }
    default:
      return state
  }

}
