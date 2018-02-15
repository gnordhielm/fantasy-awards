import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'
import { Link } from 'react-router-dom'

export const LoginPage = props => {console.log(props.location);return(
  <div className="orange-scheme page">
    <h1>Welcome</h1>

    <hr/>



    <p>
      Welcome to the Fantasy Oscars app! Here's how the game works: you start a league, fill out this year's ballot (I try to make it more about strategy than luck), send out links to your friends, and watch to see who wins come the Oscars.
    </p>

    <button className="button teal">
      Sign up with <i className="icon facebook" />
    </button>

    <button className="button teal">
      Sign up with <i className="icon phone" />
    </button>

    <p>
      Already signed up? <Link to="/" className="inline">Sign in</Link>.
    </p>

    <p>
      Get more information about this app at the <Link to="/" className="inline">about</Link> page.
    </p>



    <p>
      Words and code by <a
        href="https://www.gnportfolio.com"
        target="_blank"
        className="inline"
      >Gus</a>.
    </p>

  </div>
)}

const mapDispatch = dispatch => ({
  login: () => dispatch(startLogin())
})

export default connect(null, mapDispatch)(LoginPage)
