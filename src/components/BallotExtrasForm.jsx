import React from 'react'
import extras from 'config/extras'

const BallotExtrasForm = ({ ballot, onChange }) => {

  const handleChange = key => {
    const result = {}
    result[key] = !ballot.extras[key]
    onChange({ extras: result })
  }

  return (
    <div>
      {Object.keys(extras).map(key => (
        <div
          key={key}
          onClick={() => { handleChange(key) }}
          className={ballot.extras[key] ? 'active' : ''}
        >
          {extras[key].points}
          -
          {extras[key].description}
        </div>
      ))}
    </div>
  )
}

export default BallotExtrasForm
