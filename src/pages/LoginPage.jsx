import React from 'react'
import { connect } from 'react-redux'
import { startFacebookLogin } from '../actions/auth'
import { Link } from 'react-router-dom'

export const LoginPage = ({ login }) => (
  <div className="orange-scheme page">
    <header className="header">
      <h1 className="header__title">
        Fantasy Film Awards
      </h1>
    </header>
    <div className="page__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam est harum quo alias voluptatibus! Placeat blanditiis sed modi quos atque!</p>
      <button
        className="button button--block teal"
        onClick={login}
      >
        Log in with Facebook
      </button>

      <p>
        Or with your <Link
          className="inline"
          to="/phone-auth"
        >phone number</Link>
      </p>

    </div>

  </div>
)

const mapDispatch = dispatch => ({
  login: () => dispatch(startFacebookLogin())
})

export default connect(null, mapDispatch)(LoginPage)
