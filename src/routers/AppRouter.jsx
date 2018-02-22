
import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import LoginPage from 'pages/LoginPage'
import PhoneLoginPage from 'pages/PhoneLoginPage'
import DashboardPage from 'pages/DashboardPage'
import NotFoundPage from 'pages/NotFoundPage'
import PrivateRoute from 'routers/PrivateRoute'
import PublicRoute from 'routers/PublicRoute'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <Switch>

      <PublicRoute exact path="/" component={LoginPage} />
      <PublicRoute path="/phone-auth" component={PhoneLoginPage} />

      {/* <PrivateRoute path="/test" component={NotFoundPage} /> */}
      {/* <Route path="/join/:leagueId" component={WelcomePage} /> */}

      <PrivateRoute path="/dashboard" component={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
)

export default AppRouter
