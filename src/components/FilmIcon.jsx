import React from 'react'
import { filmIconLookup } from 'config/settings'

const FilmIcon = ({ film }) => (
  <div className="film-icon">
    <img src={`/assets/${
      filmIconLookup[film] || filmIconLookup['FALLBACK']
    }`}/>
  </div>
)

export default FilmIcon
