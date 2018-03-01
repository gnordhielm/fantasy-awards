import React from 'react'
import FilmIcon from 'components/FilmIcon'

const FeedBallot = ({
  align='left', id, user, ballot, onClick
}) => (
  <div
    className={`feed-ballot ${align.toLowerCase()}`}
    onClick={() => { onClick(id) }}
  >
    <FilmIcon film={ballot.bigOne.film}/>
    <p>{user.handle}</p>
  </div>
)

export default FeedBallot
