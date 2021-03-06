import { cloneDeep, every } from 'lodash'
import {
  bigOneEveryWinPoints,
  bigOnePicturePoints,
  basicCategoryPoints,
  basicCategories,
  minExtras
} from 'config/settings'
import nominees from 'config/nominees'
import extras from 'config/extras'

const basicsSchema = {}
basicCategories.forEach(category => {
  basicsSchema[category] = {}
  for (let i in nominees[category])
    basicsSchema[category][i] = 0
})

const extrasSchema = {}
Object.keys(extras).forEach(key => {
  extrasSchema[key] = false
})

const bigOneCheckers = {
  PICTURE: results => 0,
  EVERY_WIN: results => 0
}

const extrasCheckers = {

}

class Ballot2018 {

  basics = cloneDeep(basicsSchema)

  bigOne = {
    film: null,
    // one of PICTURE or EVERY_WIN
    pointsOn: 'PICTURE'

  }

  extras = cloneDeep(extrasSchema)

  update = (changes={}) => {

    for (let key in changes)
    {
      if (key === 'extras')
      {

        const extrasResult = {
          ...this.extras,
          ...changes.extras
        }

        let selectedExtrasCount = 0
        for (let extraKey in extrasResult)
          if (extrasResult[extraKey]) selectedExtrasCount ++

        if (selectedExtrasCount <= minExtras)
          this.extras = extrasResult

      }
      else if (key === 'basics')
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
            // TO DO - subtract from other fields when possible
            // to make everything fit

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

  validBasics = () => every(basicCategories, category => {
      const field = this.basics[category]
      let total = 0

      for (let key in field)
      {
        if (typeof field[key] === 'number')
          total += field[key]
      }

      return Math.round(total) === 1
    })

  validBigOne = () => !!this.bigOne.film

  validExtras = () => {
    let chosenExtrasCount = 0
    for (let key in this.extras)
      if (this.extras[key]) chosenExtrasCount ++

    return chosenExtrasCount === minExtras
  }

  isValid = () => {
    return this.validBigOne() &&
      this.validBasics() &&
      this.validExtras()
  }

  encode = () => JSON.stringify(this)

  decode = encodedBallot => {
      try
      {
        const data = JSON.parse(encodedBallot)
        return this.update(data)
      }
      catch (err)
      {
        console.error('decode error', err)
        return this
      }
  }

  score = (results={}) => {
    let total = 0

    // big one
    if (this.bigOne.pointsOn === 'PICTURE')
    {
      total += results["PICTURE"] === this.bigOne.film ?
        bigOnePicturePoints : 0
    }
    else
    {
      Object.keys(results).forEach(key => {
        total += results[key] === this.bigOne.film ?
          bigOneEveryWinPoints : 0
      })

    }

    // extras
    Object.keys(extras).forEach(key => {
      const extra = extras[key]
      total += this.extras[key] && extra.score(results) ?
        extra.points : 0
    })

    // basics
    for (let category in this.basics)
    {
      const field = this.basics[category]
      const result = nominees[category].findIndex(nominee => {
        return nominee.film === results[category]
      })

      if (~result)
        total += Math.round(field[result] * basicCategoryPoints)
    }

    return total
  }

}

export default Ballot2018
