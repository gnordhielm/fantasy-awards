import React from 'react'
import { avatarColorOptions } from 'settings'

export const Avatar = ({ color, movie }) => (
  <div className={"avatar " + color.toLowerCase()}>
    movie: {movie}
  </div>
)

Avatar.defaultProps = {
  color: avatarColorOptions[0],
  movie: 'PENDING'
}

export default Avatar
