import * as firebase from 'firebase'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

const database = firebase.database()

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
// facebookAuthProvider.addScope('email')
// facebookAuthProvider.addScope('user_profile')

export {
  database as default,
  firebase,
  facebookAuthProvider,
}
