import React from 'react'
import Slider from 'react-rangeslider'
import { basicCategories, basicCategoryPoints } from 'config/settings'
import { capsToDisplay } from 'config/util'
import allNominees from 'config/nominees'

// TO DO - calculate this dynamically, should be 1/number of nominees
const nomineeStep = 0.2

class BallotBasicsForm extends React.Component {

  state = {
    activeCategoryIdx: 0
  }

  // componentWillReceiveProps(newProps) {
  //   console.log('incoming props');
  //   console.log(newProps.ballot.basics)
  //   console.log(newProps.ballot.basics.DIRECTING)
  // }

  handlePageBack = () => {
    this.setState(prevState => ({
      activeCategoryIdx: prevState.activeCategoryIdx - 1
    }))
  }

  handlePageForward = () => {
    this.setState(prevState => ({
      activeCategoryIdx: prevState.activeCategoryIdx + 1
    }))
  }

  handleDistribute = () => {
    const result = {}

    const { basics } = this.props.ballot
    const activeCategory = basicCategories[this.state.activeCategoryIdx]
    const fieldLength = Object.keys(basics[activeCategory]).length
    const step = 1/fieldLength

    result[activeCategory] = {}
    for (let key in basics[activeCategory])
      result[activeCategory][key] = step

    this.props.onChange({ basics: result })
  }

  handleChange = ({ newValue, idx }) => {
    const category = basicCategories[this.state.activeCategoryIdx]
    const changes = {}
    changes[category] = {}
    // DEV - extra math to fix JS's fucked up decimal addition
    changes[category][idx] = Math.round((newValue) * 100) / 100

    this.props.onChange({ basics: changes })
  }

  renderNominee = ({ idx, nominee, value, onChange }) => (
    <div className="item">
        <div className="info">
          {nominee.recipients.reduce((acc, name, idx) =>
            acc ? `${acc}, ${name}` : '')}
            <span> for {capsToDisplay(nominee.film)}</span>
        </div>
        <div className="value">
          <Slider
            value={value}
            onChange={onChange}
            tooltip={false}
            min={0}
            max={1}
            step={nomineeStep}
          />
          <div className="points">
            {Math.round(value * basicCategoryPoints)}
          </div>
        </div>

    </div>
  )

  render() {

    const { basics } = this.props.ballot
    const { activeCategoryIdx } = this.state

    const activeCategory = basicCategories[activeCategoryIdx]
    const canPageBack = !!activeCategoryIdx
    const canPageForward = activeCategoryIdx < (basicCategories.length - 1)

    const nominees = allNominees[activeCategory]

    let remainingPortion = 1
    for (let i in basics[activeCategory])
    {
      const portion = basics[activeCategory][i]
      // DEV - extra math to fix JS's fucked up decimal addition
      remainingPortion = Math.round((remainingPortion - portion) * 100) / 100
    }

    return (
      <div className="ballot-basics-form">
        <div className="paginator">
          {canPageBack ?
            <i
              className="icon arrow left"
              onClick={this.handlePageBack}
            /> : <i className="icon" />}
          <div>
            Best {capsToDisplay(activeCategory)}
          </div>
          {canPageForward ?
            <i
              className="icon arrow right"
              onClick={this.handlePageForward}
            /> :
            <i
              className="icon checkmark"
              onClick={this.props.close}
            />
          }
        </div>

        <div className="report">
          {!!remainingPortion ?
            <p>
              {remainingPortion * basicCategoryPoints} points left to assign.
            </p>
            :
            <p>
              Done <i className="icon checkmark" />
            </p>
          }
          <p
            className="active"
            onClick={this.handleDistribute}
          >Distribute</p>
        </div>

        {nominees.map((nominee, idx) => (
          <div key={idx}>
            {this.renderNominee({
              nominee,
              idx,
              value: basics[activeCategory][idx],
              onChange: newValue => {
                this.handleChange({ newValue, idx })
              }
            })}
          </div>
        ))}

      </div>
    )
  }
}

export default BallotBasicsForm
