import React from 'react'
import { connect } from 'react-redux'
// import { startFacebookLogin } from '../actions/auth'
import { Link } from 'react-router-dom'
import PhoneLogin from 'components/PhoneLogin'

export const PhoneLoginPage = ({ login }) => (
  <div className="orange-scheme page">
    <header className="header">
      <h1 className="header__title">
        Phone Log In
      </h1>
    </header>
    <div className="page__content">
      <PhoneLogin />

    </div>

  </div>
)

const mapDispatch = dispatch => ({
  // login: () => dispatch(startFacebookLogin())
})

export default connect(null, mapDispatch)(PhoneLoginPage)
