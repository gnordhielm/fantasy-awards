import React from 'react'

class Countdown extends React.Component {

  state = {
    secondsRemaining: 0
  }

  getSecondsRemaining = () => {
    const target = new Date(this.props.target)
    const now = new Date
    const withOffset = now.getTimezoneOffset() * 60
    const normalized = Math.floor((target - now) / 1e3)

    return normalized > 0 ? normalized + withOffset : 0
  }

  componentDidMount() {
    this.setState(() => ({
      secondsRemaining: this.getSecondsRemaining()
    }))

    this.interval = setInterval(() => {
      this.setState(() => ({
        secondsRemaining: this.getSecondsRemaining()
      }))
    }, 1e3)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {

    const { secondsRemaining } = this.state

    const hasDays = secondsRemaining >= 86400
    const hasHours = secondsRemaining >= 360
    const hasMinutes = secondsRemaining >= 60

    let time = secondsRemaining
    let unit = secondsRemaining === 1 ? 'Second' : 'Seconds'

    if (hasDays)
    {
      time = Math.floor(secondsRemaining/86400)
      unit = time === 1 ? 'Day' : 'Days'
    }
    else if (hasHours)
    {
      time = Math.floor(secondsRemaining/360)
      unit = time === 1 ? 'Hour' : 'Hours'
    }
    else if (hasMinutes)
    {
      time = Math.floor(secondsRemaining/60)
      unit = time === 1 ? 'Minute' : 'Minutes'
    }

    return (
      <div>
        {time} {unit} to the Oscars
      </div>
    )
  }
}

export default Countdown
