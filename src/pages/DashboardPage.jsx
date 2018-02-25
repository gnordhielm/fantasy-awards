import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const DashboardPage = props => {

  const hasBallot = false

  return (
    <div className="page teal-scheme">
      <div>
        <h1>
          Dashboard
        </h1>
        {hasBallot ?
          <div>Ballot goes here</div> :
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

})

export default connect(mapState)(DashboardPage)
