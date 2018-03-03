import React from 'react'
import { connect } from 'react-redux'
import FeedBallot from 'components/FeedBallot'
import BallotDisplay from 'components/BallotDisplay'
import Modal from 'react-modal'
import {
  navbarTopHeight,
  navbarBottomHeight,
  desktopBreakpointPx
} from 'config/settings'

class ModalPage extends React.Component {
  state = {
    navbarPosition: 'bottom'
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    window.dispatchEvent(new Event('resize'))
  }

  componentWillUnmont() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = e => {
    const width = e.target.innerWidth
    const desktop = width >= desktopBreakpointPx
    this.setState(() => ({
      navbarPosition: desktop ? 'top' : 'bottom'
    }))
  }

  render() {
    const { navbarPosition } = this.state

    const overlayStyles = {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }

    overlayStyles[navbarPosition] = navbarPosition === 'bottom' ?
      navbarBottomHeight : navbarTopHeight

    return (
      <Modal
        className="modal-page"
        isOpen={this.props.isOpen}
        ariaHideApp={false}
        onRequestClose={this.props.onRequestClose}
        style={{
          overlay: overlayStyles
        }}
      >
        {this.props.children}
      </Modal>
    )

  }

}

export default ModalPage
