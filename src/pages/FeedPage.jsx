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
    const { users, ballots, results, uid } = this.props


    const resolvedBallots = Object.keys(ballots)
      .map(key => ({
        ballot: ballots[key],
        score: ballots[key].score(results),
        handle: users[key].handle,
        key
      }))
      .sort((a,b) => {
        if (b.score !== a.score)
          return b.score - a.score
        return a.handle.toLowerCase() < b.handle.toLowerCase() ? -1 : 1
      })

    const highestScore = resolvedBallots[0].score

    let body = (
      <div className="page__content">
        {resolvedBallots.map(({ ballot, score, handle, key }, idx) => (
          <FeedBallot
            align={idx % 2 ? 'RIGHT' : 'LEFT'}
            onClick={this.handleBallotClick}
            key={key}
            id={key}
            handle={handle}
            film={ballot.bigOne.film}
            isCurrentUser={uid === key}
            isWinner={highestScore && highestScore === score}
            score={score}
          />
        ))}
      </div>
    )

    if (focusedBallotId)
      body = (
        <div className="ballot-display-container">
          <div className="title">
            <h1 onClick={this.clearFocusedBallot}>
              <i className="icon remove"></i>
            </h1>
            <h1>
              {users[focusedBallotId].handle}
            </h1>
          </div>
          <p className="full-name">
            {users[focusedBallotId].fullName}
          </p>
          <div className="page__content">
            <BallotDisplay
              ballot={ballots[focusedBallotId]}
            />
          </div>
        </div>
      )

    return (
      <div className={`feed-page page`}>
        {body}
      </div>
    )
  }
}

const mapState = state => ({
  ballots: state.ballot,
  users: state.user,
  uid: state.auth.uid,
  results: state.result
})

export default connect(mapState)(FeedPage)
