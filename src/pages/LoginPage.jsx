import React from 'react'
import { connect } from 'react-redux'
import { startFacebookLogin } from '../actions/auth'
import { Link } from 'react-router-dom'

export const LoginPage = ({ login }) => (
  <div className="login-page page">
    <div className="page__content">
      {/* <h1 className="header__title">
        Fantasy Film Awards
      </h1> */}
      <div className="l-spacer"></div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam est harum quo alias voluptatibus! Placeat blanditiis sed modi quos atque!</p>

      <div className="page__padded-container">
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

  </div>
)

const mapDispatch = dispatch => ({
  login: () => dispatch(startFacebookLogin())
})

export default connect(null, mapDispatch)(LoginPage)
