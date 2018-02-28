import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PhoneLogin from 'components/PhoneLogin'

export const PhoneLoginPage = ({ login }) => (
  <div className="phone-login-page page">
    <div className="title">
      <Link to="/" className="dark">
        <i className="icon chevron left"></i>
        &nbsp;Back
      </Link>
      <h1>Phone Log In</h1>
    </div>
    <div className="page__content">

      <PhoneLogin />

    </div>

  </div>
)

const mapDispatch = dispatch => ({
  // login: () => dispatch(startFacebookLogin())
})

export default connect(null, mapDispatch)(PhoneLoginPage)
