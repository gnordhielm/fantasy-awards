
const initialState = {
  broadcast: 'PRE', // PRE, LIVE, POST
  nextCategory: ''
}

export default (state=initialState, action) => {
  switch(action.type)
  {
    case 'SET_NEXT_CATEGORY':
      return {
        ...state,
        nextCategory: action.payload
      }

    case 'SET_BROADCAST':
      return {
        ...state,
        broadcast: action.payload
      }

    case 'SET_OBJECTIVE_STATE':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }

}
