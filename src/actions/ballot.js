import BallotModel from 'models/Ballot'
import db from 'config/firebase'

export const set = ballot => (dispatch, getState) => {

  dispatch({
    type: 'START_SET_BALLOT',
    ballot
  })

  const data = ballot.encode()
  const { uid } = getState().auth

  db.ref(`ballots/${uid}`)
    .set(data)
    .then(() => {
      dispatch({
        type: 'SET_BALLOT',
        ballot,
        uid
      })
    })
    .catch(err => {
      dispatch({
        type: 'SET_BALLOT_ERROR',
        ballot
      })
    })

}

export const index = ({ ballots }) => {
  const payload = {}

  Object.keys(ballots).forEach(key => {
    payload[key] = new BallotModel().decode(ballots[key])
  })

  return {
    type: 'INDEX_BALLOTS',
    payload
  }

}

export const read = ({ ballot, uid }) => ({
  type: 'READ_BALLOT',
  ballot: new BallotModel().decode(ballot),
  uid
})
