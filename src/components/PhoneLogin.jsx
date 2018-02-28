import React from 'react'
import { firebase } from 'config/firebase'
import ReactLoading from 'react-loading'
const recaptchaTargetId = 'recaptcha-phone-auth-target'
const phoneRegex = /^[0-9]{10}$/

const ConfirmationInput = ({ code, onChange, onSubmit }) => (
  <form
    className="phone-number-input"
    onSubmit={onSubmit}
  >
    <p>Enter your confirmation code.</p>

    <div className="centered-input">
      <input
        type="text"
        value={code}
        onChange={onChange}
      />
    </div>

    <button
      disabled={!code}
      className="button button--block purple"
      onClick={onSubmit}
    >Submit</button>

  </form>
)

const PhoneNumberInput = ({ number, onChange, onSubmit }) => (
  <form
    className="phone-number-input"
    onSubmit={onSubmit}
  >
    <p>Enter your phone number.</p>

    <div className="centered-input">
      <div>+1</div>
      <input
        type="text"
        value={number}
        onChange={onChange}
      />
    </div>

    <button
      disabled={!(phoneRegex.test(number))}
      className="button button--block purple"
      id={recaptchaTargetId}
      onClick={onSubmit}
    >Send Code</button>

    <div className="notes">
      <p>Only US numbers can be used for login.</p>
      <p>On submission, an SMS will be sent. Message and data rates may apply.</p>
    </div>

  </form>
)

class PhoneLogin extends React.Component {

  state = {
    phoneNumber: '',
    error: '',
    loading: '',
    codeSent: false,
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
    const phoneNumber = e.target.value.replace(/[\s\-\(\)]/g, '')
    this.setState(() => ({ phoneNumber }))
  }

  handleSubmitNumber = e => {
    e.preventDefault()

    if (!phoneRegex.test(this.state.phoneNumber)) return

    this.setState(() => ({
      error: '',
      loading: 'Sending code...'
    }))

    const number = "+1" + this.state.phoneNumber
      .replace(/[\s\-\(\)]/g, '')

    firebase.auth()
      .signInWithPhoneNumber(number, window.recaptchaVerifier)
      .then(confirmer => {
        this.confirmer = confirmer
        this.setState(() => ({
          codeSent: true,
          loading: ''
        }))
      })
      .catch(err => {
        console.log('phone sign in error', err)
        this.setState(() => ({
          error: 'Error sending code, please check the number you entered and try again.',
          loading: ''
        }))
      })
  }

  handleConfirmationChange = e => {
    const confirmationCode = e.target.value
    this.setState(() => ({ confirmationCode }))
  }

  handleSubmitConfirmation = e => {
    e.preventDefault()

    this.setState(() => ({
      error: '',
      loading: 'Checking code...'
    }))

    const code = this.state.confirmationCode
    if (!code) return

    this.confirmer.confirm(code)
      .then(res => {
        // console.log('confirmation success!', res.user)
      })
      .catch(err => {
        console.log('confirmation error', err)
        this.setState(() => ({
          error: 'Could not validate confirmation code, please try again.',
          loading: ''
        }))
      })

  }

  render() {

    return (
      <div className="phone-login">
        {!!this.state.loading &&
            <div className="loading-overlay">
              <div>
                <ReactLoading
                  type="bubbles"
                  className="loader"
                />
                <p>{this.state.loading}</p>
              </div>
          </div>
        }
        {!!this.state.error &&
          <div className="error">
            <i className="icon exclamation circle"></i>
            <p>{this.state.error}</p>
          </div>
        }
        {this.state.codeSent ?
          ConfirmationInput({
            code: this.state.confirmationCode,
            onChange: this.handleConfirmationChange,
            onSubmit: this.handleSubmitConfirmation
          }) :
          PhoneNumberInput({
            number: this.state.phoneNumber,
            onChange: this.handlePhoneNumberChange,
            onSubmit: this.handleSubmitNumber
          })
        }
      </div>
    )
  }

}

export default PhoneLogin
