import React from 'react'
import { firebase } from 'config/firebase'

const recaptchaTargetId = 'recaptcha-look-here'

class PhoneLogin extends React.Component {

  state = {
    phoneNumber: '',
    errors: '',
    messageSent: false,
    confirmationCode: ''
  }

  confirmer = null

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      recaptchaTargetId,
      {
        size: 'invisible',
        callback: res => {
          // reCAPTCHA resolved, allow signin
          // console.log('allowSignIn', res)
        }
      }
    )
  }

  componentWillUnmount() {
    delete window.recaptchaVerifier
  }

  handlePhoneNumberChange = e => {
    const phoneNumber = e.target.value
    this.setState(() => ({ phoneNumber }))
  }

  handleSubmitNumber = e => {
    this.setState(() => ({ error: null }))

    const number = "+1" + this.state.phoneNumber.replace(/[\s\-\(\)]/g, '')

    const verifier = window.recaptchaVerifier
    firebase.auth().signInWithPhoneNumber(number, verifier)
      .then(confirmer => {

        // console.log('code sent!')
        this.confirmer = confirmer
        this.setState(() => ({
          messageSent: true,
        }))
      })
      .catch(err => {
        console.log('phone sign in error', err)
        this.setState(() => ({
          error: 'Could not send a message to the number provided.'
        }))
      })
  }

  handleConfirmationChange = e => {
    const confirmationCode = e.target.value
    this.setState(() => ({ confirmationCode }))
  }

  handleSubmitConfirmation = () => {
    this.setState(() => ({ error: null }))
    const code = this.state.confirmationCode
    this.confirmer.confirm(code)
      .then(res => {
        // console.log('confirmation success!', res.user)
      })
      .catch(err => {
        console.log('confirmation error', err)
        this.setState(() => ({
          error: 'Error validating confirmation code.'
        }))
      })

  }

  render() {

    if (this.state.messageSent)
      return (
          <div>
            {!!this.state.error && <p>{this.state.error}</p>}
            <label>Confirmation code</label>
            <div>
              <input
                type="text"
                value={this.state.confirmationCode}
                onChange={this.handleConfirmationChange}
              />
            </div>
            <button
              onClick={this.handleSubmitConfirmation}
            >Submit</button>
          </div>
      )

    return (
      <div>
        {!!this.state.error && <p>{this.state.error}</p>}
        <label>Phone Number</label>
        <div>
          <label>+1</label>
          <input
            type="text"
            value={this.state.phoneNumber}
            onChange={this.handlePhoneNumberChange}
          />
        </div>
        <button
          id={recaptchaTargetId}
          onClick={this.handleSubmitNumber}
        >Submit</button>

        <small>Only US numbers can be used for authentication.</small>
        <small>On submission, an SMS may be sent. Message and data rates may apply.</small>
      </div>
    )
  }

}

export default PhoneLogin