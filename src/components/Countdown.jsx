import React from 'react'

class Countdown extends React.Component {

  state = {
    secondsRemaining: 0
  }

  getSecondsRemaining = () => {

    const target = new Date(this.props.target)
    const now = new Date
    const normalized = Math.floor((target - now) / 1e3)
    const withOffset = normalized + (now.getTimezoneOffset() * 60)

    return withOffset > 0 ? withOffset : 0
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

    if (secondsRemaining <= 0)
    {
      // clearInterval(this.interval)
      return (
        <div>The Oscars are live!</div>
      )
    }

    const hasDays = secondsRemaining >= 86400
    const hasHours = secondsRemaining >= 3600
    const hasMinutes = secondsRemaining >= 60

    let time = secondsRemaining
    let unit = secondsRemaining === 1 ? 'second' : 'seconds'

    if (hasDays)
    {
      time = Math.floor(secondsRemaining/8640)
      time = (Math.round(time)/10).toFixed(1)
      unit = time === 1 ? 'day' : 'days'
    }
    else if (hasHours)
    {
      time = Math.floor(secondsRemaining/360)
      time = (Math.round(time)/10).toFixed(1)
      unit = time === 1 ? 'hour' : 'hours'
    }
    else if (hasMinutes)
    {
      time = Math.floor(secondsRemaining/60)
      unit = time === 1 ? 'minute' : 'minutes'
    }

    return (
      <div>
        {time} {unit} to the Oscars
      </div>
    )
  }
}

export default Countdown
