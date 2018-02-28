import React from 'react'
import extras from 'config/extras'

const BallotExtrasForm = ({ ballot, onChange }) => {

  const handleChange = key => {
    const result = {}
    result[key] = !ballot.extras[key]
    onChange({ extras: result })
  }

  let remaining = 3
  Object.keys(extras).forEach(key => {
    if (ballot.extras[key]) remaining --
  })

  return (
    <div className="ballot-extras-form">

      {!!remaining ?
        <p onClick={this.props.close}>{remaining} {remaining === 1 ? 'pick' : 'picks'} remaining.</p> :
        <p>Done <i className="icon checkmark"></i></p>
      }

      {Object.keys(extras).map(key => (
        <div
          key={key}
          onClick={() => { handleChange(key) }}
          className={`item ${ballot.extras[key] ? 'active' : ''}`}
        >
          <div className="points">
            {extras[key].points}
          </div>
          <div className="description">
            {extras[key].description}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BallotExtrasForm
