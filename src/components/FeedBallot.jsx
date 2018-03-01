import React from 'react'
import FilmIcon from 'components/FilmIcon'

const FeedBallot = ({
  align='left', id, user, ballot, onClick,
  isCurrentUser=false
}) => (
  <div
    className={`feed-ballot ${align.toLowerCase()}`}
    onClick={() => { onClick(id) }}
  >
    <FilmIcon
      film={ballot.bigOne.film}
      className={isCurrentUser ? "accent" : ""}
    />
    <p>{user.handle}</p>
  </div>
)

export default FeedBallot
