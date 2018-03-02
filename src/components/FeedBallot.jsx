import React from 'react'
import FilmIcon from 'components/FilmIcon'

const FeedBallot = ({
  align='left', id, handle, film, onClick, score,
  isCurrentUser=false, isWinner=false
}) => (
  <div
    className={`feed-ballot ${
      align.toLowerCase()
    } ${
      isWinner ? 'winner' : ''
    }`}
    onClick={() => { onClick(id) }}
  >
    <FilmIcon
      film={film}
      accent={isCurrentUser}
      className={isWinner ? "accent" : ""}
    />
    <p>{handle}</p>
    <p className="score">{score} points</p>
  </div>
)

export default FeedBallot
