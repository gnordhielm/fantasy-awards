import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import extras from 'config/extras'

const DashboardPage = ({ ballot }) => {

  return (
    <div className="page teal-scheme">
      <div>
        <h1>
          Dashboard
        </h1>
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
          <p>
            Please <Link
              className="inline"
              to="/new-ballot"
            >fill out a ballot</Link>.
          </p>
        }

      </div>
    </div>
  )
}

const mapState = state => ({
  ballot: state.ballot[state.auth.uid]
})

export default connect(mapState)(DashboardPage)
