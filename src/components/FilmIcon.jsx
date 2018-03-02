import React from 'react'
import { filmIconLookup } from 'config/settings'

const FilmIcon = ({ film, className="", accent }) => (
  <div className={`film-icon ${className}`}>
    <img src={`/assets/${
      filmIconLookup[film] || filmIconLookup['FALLBACK']
    }${
      accent ? '_teal' : ''
    }.svg`}/>
  </div>
)

export default FilmIcon
