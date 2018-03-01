import React from 'react'
import { filmIconLookup } from 'config/settings'

const FilmIcon = ({ film, className="" }) => (
  <div className={`film-icon ${className}`}>
    <img src={`/assets/${
      filmIconLookup[film] || filmIconLookup['FALLBACK']
    }`}/>
  </div>
)

export default FilmIcon
