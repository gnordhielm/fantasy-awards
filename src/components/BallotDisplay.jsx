import React from 'react'

const BallotDisplay = ({ ballot }) => (
  <div className="ballot-display">
    <p>
      {ballot.bigOne.film}
      {ballot.bigOne.pointsOn}
    </p>
  </div>
)

export default BallotDisplay
