import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ login }) => (
  <div className="">
    <h1>Welcome</h1>
    
    <div>
      Already signed up? Sign in
    </div>
  </div>
)

const mapDispatch = dispatch => ({
  login: () => dispatch(startLogin())
})

export default connect(null, mapDispatch)(LoginPage)
