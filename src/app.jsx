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
    let loginData

    db.ref(`users/${user.uid}`)
      .once('value')
      .then(snap => {
        loginData = {
          uid: user.uid,
          ...snap.val()
        }

        return db.ref(`ballots/${user.uid}`)
          .once('value')

      })
      .then(snap => {
        const ballot = snap.val()

        store.dispatch(login(loginData))
        if (ballot) store.dispatch(read({
          ballot, uid: user.uid
        }))

        renderApp()

        if (history.location.pathname === '/')
          history.push('/dashboard')
      })
  }
  else
  {
    store.dispatch(logout())
    history.push('/')
    renderApp()
  }
})
