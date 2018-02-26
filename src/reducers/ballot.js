import { cloneDeep } from 'lodash'
const initialState = {}

export default (state=initialState, action) => {
  switch(action.type)
  {
    case 'SET_BALLOT':
    case 'READ_BALLOT':

      const changes = cloneDeep(state)
      changes[action.uid] = action.ballot

      return {
        ...state,
        ...changes
      }

    default:
      return state
  }

}
