import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'
import { Link } from 'react-router-dom'

export const LoginPage = props => (
  <div className="orange-scheme page">
    <header className="header">
      <h1 className="header__title">
        Fantasy Oscars
      </h1>
    </header>
    <div className="page__content">

      <button className="button button--block teal">
        Sign up with Facebook
      </button>

      <p>
        Or with your <a className="inline" href="#">phone number</a>
      </p>

      <p>
        Already signed up? <Link to="/" className="inline">Sign in</Link>.
      </p>
    </div>

  </div>
)

const mapDispatch = dispatch => ({
  login: () => dispatch(startLogin())
})

export default connect(null, mapDispatch)(LoginPage)
