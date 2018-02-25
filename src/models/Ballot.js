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

    const result = cloneDeep(this)
    // console.log('update');
    // console.log(this)
    // console.log(this.basics)
    // console.log(this.basics.DIRECTING)
    // console.log('---');
    // console.log('changes', changes);
    for (let key in changes)
    {
      // console.log('changesKey', key);
      if (key === 'basics')
      {
        for (let basicKey in changes.basics)
        {
          result.basics[basicKey] = {
            ...result.basics[basicKey],
            ...changes.basics[basicKey],
          }
          // console.log("result.basics",result.basics);
        }
      }
      else
      {
        result[key] = changes[key]
      }
    }

    // console.log('result');
    // console.log(result)
    // console.log(result.basics)
    // console.log(result.basics.DIRECTING)
    // console.log('---');
    // console.log('---');
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
