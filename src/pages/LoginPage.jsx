import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ login }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Fantasy Awards</h1>
      <p>Tagline.</p>
      <button
        className="button"
        onClick={login}
      >Log In With Facebook</button>
      <button
        className="button"
        onClick={login}
      >Log In With Your Phone Number</button>
    </div>
  </div>
)

const mapDispatch = dispatch => ({
  login: () => dispatch(startLogin())
})

export default connect(null, mapDispatch)(LoginPage)
