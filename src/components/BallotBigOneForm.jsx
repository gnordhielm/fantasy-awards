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
                className={`film ${film === currentFilm ? 'active' : ''}`}
              >
                <div className="film-title">
                  {capsToDisplay(film)}
                </div>
                <div className="film-recipients">
                  {recipients.join(', ')}
                </div>
              </div>
          ))}
        </div>
      </div>
    )
  }

  renderEveryWinSelect = ({ currentFilm }) => {
    return (
      <div>
        {bigOneEveryWinPoints} points per win.
        <div>
          {mostNominations.map(({ film, nominations }, idx) => (
              <div
                key={idx}
                onClick={() => { this.handleFilmChange(film) }}
                className={`film ${film === currentFilm ? 'active' : ''}`}
              >
                <div className="film-title">
                  {capsToDisplay(film)} ({nominations.length} nominations)
                </div>
                <div className="film-nominations">
                  {nominations.reduce((acc, nom) => {
                    const formattedCategory = capsToDisplay(nom.category)
                    return acc ?
                      acc + ', ' + formattedCategory :
                      formattedCategory
                  }, "")}
                </div>

              </div>

          ))}
        </div>
      </div>
    )

  }

  render() {

    const { bigOne } = this.props.ballot

    return (
      <div className="ballot-big-one-form">
        {!!bigOne.film ?
          <p onClick={this.props.close}>Done <i className="icon checkmark"></i></p> :
          <p>Select film.</p>
        }

        <div className="points-on">
          <div>Points on:</div>
          <div
            className={`button ${
              bigOne.pointsOn === 'PICTURE' ? "active" : ''
            }`}
            onClick={this.handlePointsOnChange}
          >
            Best Picture
          </div>
          <div
            className={`button ${
              bigOne.pointsOn === 'EVERY_WIN' ? "active" : ''
            }`}
            onClick={this.handlePointsOnChange}
          >
            Every Win
          </div>

        </div>



        <div>
          {bigOne.pointsOn === 'PICTURE' ?
          this.renderPictureSelect({
            currentFilm: bigOne.film
          }) :
          this.renderEveryWinSelect({
            currentFilm: bigOne.film
          })
        }

      </div>


      </div>
    )
  }
}

export default BallotBigOneForm
