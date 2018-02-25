import { cloneDeep, every } from 'lodash'
import { basicCategories } from 'config/settings'
import nominees from 'config/nominees'

const basicsSchema = {}
basicCategories.forEach(category => {
  basicsSchema[category] = {}
  for (let i in nominees[category])
    basicsSchema[category][i] = 0
})

class Ballot {

  constructor() {
    this.basics = {
      ...basicsSchema
    }
  }

  update = (changes={}) => {
    const result = cloneDeep(this)

    for (let key in changes)
    {
      if (key === 'basics')
      {
        // const finalBasics = {
        //   ...result.basics
        // }
        //
        // for (l)

        result.basics = {
          ...result.basics,
          ...changes.basics
        }
      }
      else
      {
        result[key] = changes[key]
      }
    }
console.log('change result', result.basics)
    return result
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

}

export default Ballot
