import React from 'react'
import { capsToDisplay } from 'config/util'
import extras from 'config/extras'
import nominees from 'config/nominees'
import { basicCategoryPoints } from 'config/settings'


const BallotDisplay = ({ ballot }) => (
  <div className="ballot-display">
    <h2>The Big One</h2>
    <p>
      {capsToDisplay(ballot.bigOne.film)}, {
        ballot.bigOne.pointsOn === "EVERY_WIN" ?
        "on every win" : "best picture"
      }.
    </p>
    <h2>Extras</h2>
    {Object.keys(ballot.extras)
      .filter(key => ballot.extras[key])
      .map(key => extras[key])
      .map(({ points, description }, idx) => (
        <p key={idx} className="extra">
          <span className="highlight">{points} points</span> {description}
        </p>
      ))}
      <h2>Basic Categories</h2>
      {Object.keys(ballot.basics)
        .map(key => (
          <div key={key} className="basic">
            <p className="highlight">Best {capsToDisplay(key)}</p>
            {Object.keys(ballot.basics[key])
              .filter(idx => ballot.basics[key][idx])
              .map(idx => (
                <div key={idx} className="choice">
                  <span>{
                    nominees[key][idx].recipients.join(', ')
                  } for {
                    capsToDisplay(nominees[key][idx].film)
                  }</span>

                  <p>
                    {Math.round(
                      ballot.basics[key][idx] * basicCategoryPoints
                    )} points.
                  </p>
                </div>
              ))
            }

          </div>
        ))}
  </div>
)

export default BallotDisplay
