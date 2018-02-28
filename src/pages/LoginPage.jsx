import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Footer from 'components/Footer'
import { startFacebookLogin } from '../actions/auth'

export const LoginPage = ({ login }) => (
  <div className="login-page page">
    <div className="page__content">

      <div className="l-spacer"></div>
      <div className="page__padded-container">

        <p>Movie fans' answer to fantasy sports. Sign in with one click, fill out a ballot, then follow along while the Oscars are live!</p>

        <br/>

        <button
          className="button button--block purple"
          onClick={login}
          >
            Log in with Facebook
          </button>
          <p>
            Or with your <Link
              className="underline"
              to="/phone-auth"
            >phone number</Link>.
            </p>
      </div>

    </div>
    <Footer className="orange" />

  </div>
)

const mapDispatch = dispatch => ({
  login: () => dispatch(startFacebookLogin())
})

export default connect(null, mapDispatch)(LoginPage)
