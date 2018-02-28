import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { cloneDeep} from 'lodash'
import BallotModel from 'models/Ballot'
import { set } from 'actions/ballot'

import BallotBasicsForm from 'components/BallotBasicsForm'
import BallotBigOneForm from 'components/BallotBigOneForm'
import BallotExtrasForm from 'components/BallotExtrasForm'

const formComponentLookup = {
  BASICS: BallotBasicsForm,
  BIG_ONE: BallotBigOneForm,
  EXTRAS: BallotExtrasForm
}

const titleLookup = {
  BASICS: 'Basics',
  BIG_ONE: 'The Big One',
  EXTRAS: 'Extras'
}

class CreateBallotPage extends React.Component {

  state = {
    activeForm: null,
    ballot: new BallotModel()
  }

  handleBallotChange = changes => {

    this.setState(prevState => ({
      ballot: prevState.ballot.update(changes)
    }))

  }

  handleCreate = () => {
    console.log('create', this.state.ballot)
    if (this.state.ballot.isValid())
    {
      this.props.dispatch(set(this.state.ballot))
      this.props.history.push('/')
    }
  }

  render() {

    const { ballot } = this.state

    const Form = formComponentLookup[this.state.activeForm]

    if (Form)
    {
      return (
        <div className="page create-ballot-page-form">
          <div className="title">
            <span
              onClick={() => {
                this.setState(() => ({ activeForm: null }))
              }}
            >
              <i className="icon chevron left"/>
              &nbsp;Back
            </span>
            <h1>{titleLookup[this.state.activeForm]}</h1>

          </div>
          <div className="page__content">
            <Form
              ballot={ballot}
              onChange={this.handleBallotChange}
              close={() => {
                this.setState(() => ({ activeForm: null }))
              }}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="page create-ballot-page">
        <div className="title">
          <Link to="/" className="dark">
            <i className="icon remove"></i>
            &nbsp;Discard
          </Link>
          <h1>New Ballot</h1>
        </div>

        <div className="page__content">

          <div className="categories">
            <div
              className={`card ${ballot.validBasics() ? 'complete' : ''}`}
              onClick={() => {
                this.setState(() => ({ activeForm: 'BASICS' }))
              }}
            >
              Basic Categories
              {ballot.validBasics() &&
                <i className="icon checkmark" />}
            </div>

            <div
              className={`card ${ballot.validBigOne() ? 'complete' : ''}`}
              onClick={() => {
                this.setState(() => ({ activeForm: 'BIG_ONE' }))
              }}
            >
              The Big One
              {ballot.validBigOne() &&
                <i className="icon checkmark" />}
            </div>

            <div
              className={`card ${ballot.validExtras() ? 'complete' : ''}`}
              onClick={() => {
                this.setState(() => ({ activeForm: 'EXTRAS' }))
              }}
            >
              Extras
              {ballot.validExtras() &&
                <i className="icon checkmark" />}
            </div>

          </div>

          <button
            className="button button--block orange"
            disabled={!ballot.isValid()}
            onClick={this.handleCreate}
          >Create</button>
        </div>

      </div>
    )
  }

}

export default connect()(CreateBallotPage)
