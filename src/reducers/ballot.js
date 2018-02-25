
const initialState = {
}

export default (state=initialState, action) => {
  switch(action.type)
  {
    case 'LOGIN':
    // add user ballot
      return {
        ...state
      }
    case 'LOGOUT':
      return {
        ...initialState
      }
    default:
      return state
  }

}
