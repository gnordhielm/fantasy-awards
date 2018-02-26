import { cloneDeep, every } from 'lodash'
import { basicCategories } from 'config/settings'
import nominees from 'config/nominees'

const basicsSchema = {}
basicCategories.forEach(category => {
  basicsSchema[category] = {}
  for (let i in nominees[category])
    basicsSchema[category][i] = 0
})

const bigOneCheckers = {
  PICTURE: _ => _,
  EVERY_WIN: _ => _
}

class Ballot {

  basics = {
    ...basicsSchema
  }

  bigOne = {
    film: null,
    // one of PICTURE or EVERY_WIN
    pointsOn: 'PICTURE'

  }

  extras = {

  }


  update = (changes={}) => {

    for (let key in changes)
    {
      if (key === 'basics')
      {
        for (let basicKey in changes.basics)
        {
          // make room for the change
          // if the change fits, just put it in
          // otherwise, subtract what you can from the last non-change
          // field
          this.basics[basicKey] = {
            ...this.basics[basicKey],
            ...changes.basics[basicKey],
          }
        }
      }
      else
      {
        this[key] = changes[key]
      }
    }

    return cloneDeep(this)
  }

  validBasics = () => {
    every(basicCategories, category => {
      const field = this.basics[category]
      let total = 0

      for (let key in field)
      {
        if (typeof field[key] === 'number')
          total += field[key]
      }

      return total === 1

    })
  }


  validBigOne = () => true
  validExtras = () => false

  valid = () => false

  encode = () => JSON.stringify(this)

  decode = encodedBallot => {
      try
      {
        return JSON.parse(encodedBallot)
      }
      catch (err)
      {
        return this
      }
  }

}
window.Ballot = Ballot
export default Ballot
