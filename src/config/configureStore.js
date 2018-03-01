import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux'
import thunk from 'redux-thunk'
import authReducer from 'reducers/auth'
import ballotReducer from 'reducers/ballot'
import userReducer from 'reducers/user'
import objectiveStateReducer from 'reducers/objectiveState'
import resultReducer from 'reducers/result'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => createStore(
  combineReducers({
    auth: authReducer,
    ballot: ballotReducer,
    objectiveState: objectiveStateReducer,
    result: resultReducer,
    user: userReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
)
