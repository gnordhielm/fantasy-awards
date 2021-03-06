import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from 'actions/auth'
import { personalLink, oscars2018Time } from 'settings'
import Countdown from 'components/Countdown'
import pkg from '../../package'

const plainMessage = message => (
  <div>
    {message}
  </div>
)
const ballotReminder = () => (
  <div>
    <span>Please </span>
    <Link
      to="/new-ballot"
      className="underline"
    >fill out a ballot</Link>
    <span>.</span>
  </div>
)

const liveLeftHeader = () => (
  <div>Upcoming category/most most recent result</div>
)

const countdownLeftHeader = () => (
  <Countdown
    target={oscars2018Time}
  />
)

class Header extends React.Component {

  state = {
    infoBanner: false
  }

  handleToggleInfoBanner = () => {
    this.setState(prevState => ({
      infoBanner: !prevState.infoBanner
    }))
  }

  render() {

    if (this.state.infoBanner) return (
      <header className="header info-banner">
        <div className="header__left">
          <span className="purple-text">
            Words and code by <a
              href={personalLink}
              target="_blank"
              className="underline purple"
            >Gus</a>.
          </span>
        </div>
        <div className="header__right">
          <button
            className="header__action"
            onClick={this.props.logout}
          >
            <span>Log Out</span>
          </button>
          <button
            className="header__action"
            onClick={this.handleToggleInfoBanner}
          >
            <i className="icon remove"></i>
          </button>
        </div>
      </header>
    )

    const { live, hasBallot, message } = this.props

    let text
    if (message)
      text = plainMessage(message)
    else if (!hasBallot)
      text = ballotReminder()
    else
      text = countdownLeftHeader()

    return (
      <header className="header">
        <div className="header__left">
          {text}
        </div>
        <div className="header__right">
          <NavLink
            to="/feed"
            className="header__nav"
          >
            <i className="icon globe"></i>
          </NavLink>
          <NavLink
            to="/home"
            className="header__nav"
          >
            <i className="icon user"></i>
          </NavLink>
          {/* <button
          className="header__action"
          onClick={logout}
          >Log Out</button> */}
          <button
            className="header__action"
            onClick={this.handleToggleInfoBanner}
          >
            <i className="icon ellipsis vertical"></i>
          </button>
        </div>
      </header>
    )
  }
}

const mapState = state => ({
  live: false, // TO DO - add a firebase listener for this
  hasBallot: !!state.ballot[state.auth.uid],
  message: state.objectiveState.message
})

const mapDispatch = dispatch => ({
  logout: () => dispatch(startLogout())
})

export default connect(mapState, mapDispatch)(Header)
