import React from 'react'
import db, { firebase } from 'config/firebase'
import Avatar from 'components/Avatar'
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
    movie: undefined,
    color: avatarColorOptions[0]
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
    let handle = e.target.value
      .slice(0, maxHandleLength)
      .replace(/\s/g, '')

    this.setState(() => ({ handle }))

  }

  handleColorChange = color => {
    this.setState(() => ({ color }))
  }

  handleSubmit = () => {

    this.setState(() => ({ error: '' }))

    const { fullName, handle, color, uid } = this.state

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
          .update({ fullName, handle, color })

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
      <div className="page purple-scheme">
        <div className="user-form">
          <h1>Complete your profile</h1>
          {!!this.state.error && <p>{this.state.error}</p>}
          <div>
            <p>Full Name</p>
            <input
              spellCheck={false}
              type="text"
              value={this.state.fullName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <p>Handle</p>
            <input
              spellCheck={false}
              type="text"
              value={this.state.handle}
              onChange={this.handleHandleChange}
            />
            <small>Max {maxHandleLength} characters, no whitespace.</small>
          </div>
          <div>
            <p>Avatar Color</p>
            <div>
              {avatarColorOptions.map(color => (
                <div
                  key={color}
                  onClick={() => this.handleColorChange(color)}
                  className={`color-picker ${
                    this.state.color === color ? 'active' : ''
                  }`}
                >
                  <Avatar
                    color={color}
                    movie={this.state.movie}
                  />
                </div>
              ))}
            </div>
          </div>
          <button onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )
  }

}



export default connect()(CompleteProfilePage)
