import React from 'react'
import db, { firebase } from 'config/firebase'
import { maxHandleLength, avatarColorOptions } from 'settings'
import { login } from 'actions/auth'
import { connect } from 'react-redux'

const getHandleFromEmail = (email="") => email.split('@')[0]

// TO DO - create profile form component, use for updating profile

class CompleteProfilePage extends React.Component {

  state = {
    uid: '',
    fullName: '',
    handle: '',
    error: '',
    movie: undefined
  }

  componentWillMount() {
    const user = firebase.auth().currentUser

    const uid = user.uid
    const handle = user.email ? getHandleFromEmail(user.email) : ""
    const fullName = user.displayName || ""

    this.setState(() => ({ fullName, handle, uid }))
  }

  handleNameChange = e => {
    const fullName = e.target.value
    this.setState(() => ({ fullName }))
  }

  handleHandleChange = e => {
    console.log('handle handle change')
    const handle = e.target.value
      .slice(0, maxHandleLength)
      .replace(/\s/g, '')

    this.setState(() => ({ handle }))

  }

  handleColorChange = color => {
    this.setState(() => ({ color }))
  }

  handleSubmit = e => {
    e.preventDefault()

    this.setState(() => ({ error: '' }))

    const { fullName, handle, uid } = this.state

    // validate handle uniqueness
    return db.ref(`users`)
      .once('value')
      .then(snap => {
        const handles = []
        snap.forEach(childSnap => {
          if (childSnap.key !== uid)
            handles.push(childSnap.val().handle)
        })

        console.log('handles', handles);

        if (handles.includes(handle))
        {
          this.setState(() => ({
            error: 'That handle has already been taken, please chose another.'
          }))
          throw new Error()
        }

        return db.ref(`users/${uid}`)
          .update({ fullName, handle })

      })
      .then(() => {
        console.log('user updated')
        this.props.dispatch(login({
          fullName, handle, uid
        }), () => {
          this.props.history.push('/')
        })
      })
      .catch(err => {
        console.log('err', err)
      })

  }

  render() {

    return (
      <div className="complete-profile-page page">
        <div className="title">
          <h1>Complete your Profile</h1>
        </div>
        <form
          className="page__content"
          onSubmit={this.handleSubmit}
        >
          <div className="user-form">
            <div className="field">
              <p className="label">Full Name</p>
              <input
                spellCheck={false}
                type="text"
                value={this.state.fullName}
                onChange={this.handleNameChange}
              />
              <p className="label">Handle</p>
              <input
                spellCheck={false}
                type="text"
                value={this.state.handle}
                onChange={this.handleHandleChange}
              />
              <p className="note">Max {maxHandleLength} characters, no whitespace.</p>
            </div>
            <div>
              {!!this.state.error &&
                <div className="error">
                  <i className="icon exclamation circle"></i>
                  <p>{this.state.error}</p>
                </div>
              }

              <button
                className="button button--block purple"
                onClick={this.handleSubmit}
              >Submit</button>
            </div>
            </div>
        </form>
      </div>
    )
  }

}



export default connect()(CompleteProfilePage)
