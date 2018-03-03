import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { basicCategoryPoints } from 'config/settings'
import { capsToDisplay } from 'config/util'
import extras from 'config/extras'
import nominees from 'config/nominees'

const HomePage = ({ ballot, handle, results }) => {

  return (
    <div className="page home-page">
      <div className="title">
        <h1>{handle}</h1>
      </div>
      {!!ballot &&
        <div className="points">{ballot.score(results)} points</div>
      }
      <div className="page__content">
        {!!ballot ?
          <div>
            <h2>The Big One</h2>
            <p>
              {capsToDisplay(ballot.bigOne.film)} on {
                ballot.bigOne.pointsOn === "EVERY_WIN" ?
                "every win" : "best picture win"
              }.
            </p>
            <h2>Extras</h2>
            {Object.keys(ballot.extras)
              .filter(key => ballot.extras[key])
              .map(key => extras[key])
              .map(({ points, description }, idx) => (
                <p key={idx} className="extra">
                  {points} points: {description}
                </p>
              ))}

              <h2>Basic Categories</h2>
              {Object.keys(ballot.basics)
                .map(key => (
                  <div key={key} className="basic">
                    <p className="basic-title">Best {capsToDisplay(key)}</p>
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

            </div> :
            <Link
              className="button"
              to="/new-ballot"
            >
              <i className="icon plus"></i>&ensp;
              Create Ballot
            </Link>
            }
      </div>
    </div>
  )
}

const mapState = state => ({
  ballot: state.ballot[state.auth.uid],
  handle: state.auth.handle,
  results: state.result
})

export default connect(mapState)(HomePage)
