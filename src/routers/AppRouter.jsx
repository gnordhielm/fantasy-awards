
import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import LoginPage from 'pages/LoginPage'
import PhoneLoginPage from 'pages/PhoneLoginPage'
import FeedPage from 'pages/FeedPage'
import HomePage from 'pages/HomePage'
import CreateBallotPage from 'pages/CreateBallotPage'
import NotFoundPage from 'pages/NotFoundPage'

import PrivateRoute from 'routers/PrivateRoute'
import NoHeaderPrivateRoute from 'routers/NoHeaderPrivateRoute'
import PublicRoute from 'routers/PublicRoute'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <Switch>

      <PublicRoute
        exact
        path="/"
        component={LoginPage}
      />
      <PublicRoute
        path="/phone-auth"
        component={PhoneLoginPage}
      />

      <PrivateRoute
        path="/home"
        component={HomePage}
      />
      <PrivateRoute
        path="/feed"
        component={FeedPage}
      />
      <NoHeaderPrivateRoute
        path="/new-ballot"
        component={CreateBallotPage}
      />

      <Route
        component={NotFoundPage}
      />

    </Switch>
  </Router>
)

export default AppRouter
