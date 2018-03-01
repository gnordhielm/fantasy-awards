import 'semantic-ui-icon/icon.css'
import 'react-rangeslider/lib/index.css'
import 'normalize.css/normalize.css'
import 'styles/styles.scss'

import db, { firebase } from 'config/firebase'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from 'routers/AppRouter.jsx'
import configureStore from 'config/configureStore'
import { read } from 'actions/ballot'
import { login, logout } from 'actions/auth'
import * as ballotActions from 'actions/ballot'
import * as userActions from 'actions/user'
import LoadingPage from 'pages/LoadingPage.jsx'

const store = configureStore()

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRendered = false
const renderApp = () => {
  if(!hasRendered)
  {
    ReactDOM.render(app, document.getElementById("app"))
  }
}

ReactDOM.render(
  <LoadingPage />,
  document.getElementById("app")
)

firebase.auth().onAuthStateChanged(user => {
  if (user)
  {

    // get full user info
    db.ref(`users/${user.uid}`).once('value')
      .then(snap => {

        store.dispatch(login({
          uid: user.uid,
          ...snap.val()
        }))

        // get all ballots
        return db.ref(`ballots`).once('value')
      })
      .then(snap => {
        const ballots = snap.val()
        store.dispatch(ballotActions.index({ ballots }))

        // get all users
        return db.ref(`users`).once('value')
      })
      .then(snap => {
        const users = snap.val()
        store.dispatch(userActions.index({ users }))

        return
      })
      .then(() => {
        renderApp()
        if (history.location.pathname === '/')
          history.push('/feed')
      })
  }
  else
  {
    store.dispatch(logout())
    history.push('/')
    renderApp()
  }
})

// objective state subscription
const handleObjectiveStateChange = snap => {
  const payload = snap.val()
  console.log('handleObjectiveStateChange', payload)
  store.dispatch({
    type: 'SET_OBJECTIVE_STATE',
    payload
  })
}
db.ref(`objectiveState`).on('value', handleObjectiveStateChange)

// results subscription
const handleResultsChange = snap => {
  const payload = snap.val()
  console.log('handleResultsChange', payload)
  store.dispatch({
    type: 'SET_RESULTS',
    payload
  })
}
db.ref(`results`).on('value', handleResultsChange)
