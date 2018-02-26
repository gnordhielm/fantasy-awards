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
          const categoryFields = this.basics[basicKey]
          const categoryFieldChanges = changes.basics[basicKey]

          const categoryFieldsResult = {
            ...categoryFields,
            ...categoryFieldChanges,
          }

          let totalAfterChange = 0
          for (let i in categoryFieldsResult)
            totalAfterChange += categoryFieldsResult[i]

          if (totalAfterChange > 1)
          {
            // const fieldLength = Object.keys(this.basics[basicKey]).length
            // const step = 1/fieldLength
            // const changeIndices = Object.keys(categoryFieldChanges).sort()
            //
            // for (let i = 0; i < (fieldLength - 1); i++)
            // {
            //   if (changeIndices.includes(i)) continue
            //   while (totalAfterChange > 1)
            //   {
            //     if (!categoryFieldsResult[i]) break
            //     totalAfterChange -= step
            //     categoryFieldsResult[i] -= step
            //   }
            // }
            //
            // if (totalAfterChange <= 1)
            //   this.basics[basicKey] = categoryFieldsResult

          }
          else
            this.basics[basicKey] = categoryFieldsResult

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
