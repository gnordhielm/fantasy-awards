import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'
import { Link } from 'react-router-dom'

export const LoginPage = props => (
  <div className="orange-scheme page">
    <header className="header">
      <h1 className="header__title">
        Fantasy Awards
      </h1>
    </header>
    <div className="page__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam est harum quo alias voluptatibus! Placeat blanditiis sed modi quos atque!</p>
      <button className="button button--block teal">
        Log in with Facebook
      </button>

      <p>
        Or with your <a className="inline" href="#">phone number</a>
      </p>

    </div>

  </div>
)

const mapDispatch = dispatch => ({
  login: () => dispatch(startLogin())
})

export default connect(null, mapDispatch)(LoginPage)
