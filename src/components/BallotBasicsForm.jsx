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
    <div>
        <div>
          {nominee.recipients.reduce((acc, name, idx) =>
            acc ? `${acc}, ${name}` : '')}
        </div>
        <div>for</div>
        <div>
          {capsToDisplay(nominee.film)}
        </div>
        <Slider
          value={value}
          onChange={onChange}
          tooltip={false}
          min={0}
          max={1}
          step={nomineeStep}
        />
        {/* <Slider
          value={50}
          onChange={onChange}
        >
        </Slider> */}

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
      <div>
        <div>
          {canPageBack &&
            <i
              className="icon arrow left"
              onClick={this.handlePageBack}
            />}
          {canPageForward &&
            <i
              className="icon arrow right"
              onClick={this.handlePageForward}
            />}
        </div>

        <div>
          Best {capsToDisplay(activeCategory)}
        </div>

        <button
          onClick={this.handleDistribute}
        >Distribute Evenly</button>

        {!!remainingPortion ?
          <div>
            {remainingPortion * basicCategoryPoints} points left to assign.
          </div>
          :
          <div>
            Done!
          </div>
        }

        {nominees.map((nominee, idx) => (
          <div key={idx}>
            <hr/>
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
