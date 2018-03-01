import { cloneDeep } from 'lodash'
const initialState = {}

export default (state=initialState, action) => {
  switch(action.type)
  {
    case 'INDEX_USERS':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }

}
