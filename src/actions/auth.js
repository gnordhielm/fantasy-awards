
import {
  firebase, facebookAuthProvider
} from 'config/firebase'

export const login = uid => ({
  type: 'LOGIN',
  uid
})

export const startFacebookLogin = () => dispatch => {
    return firebase.auth().signInWithRedirect(facebookAuthProvider)
}

export const startPhoneLogin = () => dispatch => {
    // return firebase.auth().signInWithPopup(facebookAuthProvider)
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
    return firebase.auth().signOut()
}
