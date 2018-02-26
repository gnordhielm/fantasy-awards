import React from 'react'
import { Link } from 'react-router-dom'
import { cloneDeep} from 'lodash'
import BallotModel from 'models/Ballot'

import BallotBasicsForm from 'components/BallotBasicsForm'
import BallotBigOneForm from 'components/BallotBigOneForm'
import BallotExtrasForm from 'components/BallotExtrasForm'

const formComponentLookup = {
  BASICS: BallotBasicsForm,
  BIG_ONE: BallotBigOneForm,
  EXTRAS: BallotExtrasForm
}

class CreateBallotPage extends React.Component {

  state = {
    activeForm: null,

    activeForm: 'EXTRAS',
    // activeForm: 'BIG_ONE',
    // activeForm: 'BASICS',

    ballot: new BallotModel()
  }


  handleDiscard = () => {
    this.props.history.push('/')
  }

  handleBallotChange = changes => {

    this.setState(prevState => ({
      ballot: prevState.ballot.update(changes)
    }))

  }

  handleCreate = () => {
    console.log('create', this.state.ballot)
    // validate ballot
    // save
    // redirect
  }

  render() {

    const Form = formComponentLookup[this.state.activeForm]

    if (Form)
    {
      return (
        <div className="page orange-scheme">
          <i
            className="icon chevron left"
            onClick={() => {
              this.setState(() => ({ activeForm: null }))
            }}
          />
          <Form
            ballot={this.state.ballot}
            onChange={this.handleBallotChange}
          />
        </div>
      )
    }

    return (
      <div className="page purple-scheme">

        <div>

          <div>
            <button onClick={this.handleDiscard}>Discard</button>
            <button
              disabled={!this.state.ballot.valid()}
              onClick={this.handleCreate}
            >Create</button>
          </div>

          <h1>
            New Ballot
          </h1>

          <div
            onClick={() => {
              this.setState(() => ({ activeForm: 'BASICS' }))
            }}
          >
            Basic Categories
            {this.state.ballot.validBasics() &&
              <i className="icon checkmark" />}
          </div>

          <div
            onClick={() => {
              this.setState(() => ({ activeForm: 'BIG_ONE' }))
            }}
          >
            The Big One
            {this.state.ballot.validBigOne() &&
              <i className="icon checkmark" />}
          </div>

          <div
            onClick={() => {
              this.setState(() => ({ activeForm: 'EXTRAS' }))
            }}
          >
            Extras
            {this.state.ballot.validExtras() &&
              <i className="icon checkmark" />}
          </div>
        </div>

      </div>
    )
  }

}

export default CreateBallotPage
