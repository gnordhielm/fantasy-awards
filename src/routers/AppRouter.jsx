
import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import LoginPage from 'pages/LoginPage.jsx'
import DashboardPage from 'pages/DashboardPage.jsx'
import NotFoundPage from 'pages/NotFoundPage.jsx'
import PrivateRoute from 'routers/PrivateRoute.jsx'
import PublicRoute from 'routers/PublicRoute.jsx'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" exact component={LoginPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter
