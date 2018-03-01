import BallotModel from 'models/Ballot'
import db from 'config/firebase'

export const index = ({ users }) => {
  // const payload = {}

  // Object.keys(users).forEach(key => {
  //   payload[key] = new BallotModel().decode(users[key])
  // })

  return {
    type: 'INDEX_USERS',
    payload: users
  }

}

// export const read = ({ ballot, uid }) => ({
//   type: 'READ_BALLOT',
//   ballot: new BallotModel().decode(ballot),
//   uid
// })
