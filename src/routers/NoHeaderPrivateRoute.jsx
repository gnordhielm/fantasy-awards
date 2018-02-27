import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from 'components/Header.jsx'
import CompleteProfilePage from 'pages/CompleteProfilePage'

export const PrivateRoute = ({
  isAuthenticated,
  isProfileComplete,
  component: Component,
  ...rest
}) => {

  let FinalComponent

  if (!isAuthenticated)
    FinalComponent = props => <Redirect to="/"/>
  else if (!isProfileComplete)
    FinalComponent = props => <CompleteProfilePage {...props} />
  else
    FinalComponent = props => <Component {...props} />

  return <Route {...rest} component={FinalComponent} />
}

const mapState = ({ auth }) => ({
  isAuthenticated: !!auth.uid,
  isProfileComplete: !!(auth.fullName && auth.handle)
})

export default connect(mapState)(PrivateRoute)
