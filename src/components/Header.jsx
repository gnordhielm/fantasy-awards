import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

export const Header = ({ logout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link
          className="header__title"
          to="/dashboard"
          >
            <h1>Boilerplate</h1>
          </Link>
          <button
            className="button button--link"
            onClick={logout}
          >Log Out</button>
      </div>
    </div>
  </header>
)

const mapDispatch = dispatch => ({
  logout: () => dispatch(startLogout())
})

export default connect(null, mapDispatch)(Header)
