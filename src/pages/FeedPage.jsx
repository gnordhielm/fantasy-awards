import React from 'react'
import { connect } from 'react-redux'
import FeedBallot from 'components/FeedBallot'

class FeedPage extends React.Component {

  state = {
    focusedBallotId: null
  }

  handleBallotClick = id => {
    this.setState(() => ({ focusedBallotId: id }))
  }

  clearFocusedBallot = () => {
    this.setState(() => ({ focusedBallotId: null }))
  }

  render() {

    if (this.state.focusedBallotId)
      return (
        <div className="page feed-page">
          <div onClick={this.clearFocusedBallot}>
            {this.state.focusedBallotId}
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
