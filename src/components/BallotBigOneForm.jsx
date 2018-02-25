import React from 'react'
import nominees from 'config/nominees'
import { capsToDisplay } from 'config/util'
import {
  mostNominations,
  bigOneEveryWinPoints,
  bigOnePicturePoints
} from 'settings'

class BallotBigOneForm extends React.Component {

  state = {

  }

  handlePointsOnChange = () => {
    this.props.onChange({
      bigOne: {
        pointsOn: this.props.ballot.bigOne.pointsOn === 'PICTURE' ?
          'EVERY_WIN' : 'PICTURE'
      }
    })
  }

  handleFilmChange = film => {
    this.props.onChange({
      bigOne: {
        ...this.props.ballot.bigOne,
        film
      }
    })
  }

  renderPictureSelect = ({ currentFilm }) => {
    return (
      <div>
        {bigOnePicturePoints} points.
        <div>
          {nominees.PICTURE.map(({ film, recipients }, idx) => (
              <div
                key={idx}
                onClick={() => { this.handleFilmChange(film) }}
                className={film === currentFilm ? 'active' : ''}
              >
                <br/>
                {capsToDisplay(film)}
                <br/>
                {recipients.join(', ')}
              </div>
          ))}
        </div>
      </div>
    )
  }

  renderEveryWinSelect = () => {
    return (
      <div>
        {bigOneEveryWinPoints} points per win.
        <div>
          {mostNominations.map(({ film, nominations }, idx) => (
              <div
                key={idx}
                onClick={() => { this.handleFilmChange(film) }}
              >
                {/* className={film === currentFilm ? 'active' : ''} */}
                <br/>
                {capsToDisplay(film)} ({nominations.length} nominations)
                <br/>
                {nominations.reduce((acc, nom) => {
                  const formattedCategory = capsToDisplay(nom.category)
                  return acc ?
                    acc + ', ' + formattedCategory :
                    formattedCategory
                }, "")}
              </div>
          ))}
        </div>
      </div>
    )

  }

  render() {

    const { bigOne } = this.props.ballot

    return (
      <div>
        <h1>The Big One</h1>
        <div>Points on:</div>
        <div>
          <div
            className={bigOne.pointsOn === 'PICTURE' ? "active" : ''}
            onClick={this.handlePointsOnChange}
          >
            Best Picture
          </div>
          <div
            className={bigOne.pointsOn === 'EVERY_WIN' ? "active" : ''}
            onClick={this.handlePointsOnChange}
          >
            Every Win
          </div>
        </div>
        <hr/>
        <div>
          {bigOne.pointsOn === 'PICTURE' ?
            this.renderPictureSelect({
              currentFilm: bigOne.film
            }) :
            this.renderEveryWinSelect()
          }
        </div>

      </div>
    )
  }
}

export default BallotBigOneForm
