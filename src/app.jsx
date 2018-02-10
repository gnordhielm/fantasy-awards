import 'normalize.css/normalize.css'
import './styles/styles.scss'
import { firebase } from './firebase/firebase'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter.jsx'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import LoadingPage from './components/LoadingPage.jsx'

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
    store.dispatch(login(user.uid))
    renderApp()
    if (history.location.pathname === '/')
    {
      history.push('/dashboard')
    }
  }
  else
  {
    store.dispatch(logout())
    history.push('/')
    renderApp()
  }
})
