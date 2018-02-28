import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import extras from 'config/extras'

const HomePage = ({ ballot, handle }) => {

  return (
    <div className="page home-page">
      <div className="title">
        <h1>{handle}</h1>
      </div>
      <div className="page__content">
        {!!ballot ?
          <div>
            <div>Basics</div>
            <div>Big One</div>
            <hr/>
            <div>Extras</div>
            {Object.keys(ballot.extras)
              .filter(key => ballot.extras[key])
              .map(key => extras[key])
              .map(({ points, description }, idx) => (
                <div key={idx}>
                  <div>{points}</div>
                  <div>{description}</div>
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
  handle: state.auth.handle
})

export default connect(mapState)(HomePage)
