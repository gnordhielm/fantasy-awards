import React from 'react'
import { connect } from 'react-redux'
import FeedBallot from 'components/FeedBallot'
import BallotDisplay from 'components/BallotDisplay'

class FeedPage extends React.Component {

  state = {
    focusedBallotId: null
  }

  handleBallotClick = id => {

    if (id === this.props.uid)
      this.props.history.push('/home')
    else
      this.setState(() => ({ focusedBallotId: id }))
  }

  clearFocusedBallot = () => {
    this.setState(() => ({ focusedBallotId: null }))
  }

  render() {

    const { focusedBallotId } = this.state

    if (focusedBallotId)
      return (
        <div className="page feed-page with-ballot">
          <div className="title">
            <h1 onClick={this.clearFocusedBallot}>
              <i className="icon remove"></i>
            </h1>
            <h1>
              {this.props.users[focusedBallotId].handle}
            </h1>
          </div>
          <div className="page__content">
            <BallotDisplay
              ballot={this.props.ballots[focusedBallotId]}
            />
          </div>
        </div>
      )

    return (
      <div className="feed-page page">
        <div className="page__content">
          {Object.keys(this.props.ballots).map((key, idx) => (
            <FeedBallot
              align={idx % 2 ? 'RIGHT' : 'LEFT'}
              onClick={this.handleBallotClick}
              key={key}
              id={key}
              user={this.props.users[key]}
              ballot={this.props.ballots[key]}
              isCurrentUser={this.props.uid === key}
            />
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  ballots: state.ballot,
  users: state.user,
  uid: state.auth.uid
})

export default connect(mapState)(FeedPage)
