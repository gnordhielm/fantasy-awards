import { nominationsByFilm } from 'config/util'
import nominees from 'config/nominees'

export const recaptchaTargetId = 'recaptcha-phone-auth-target'
export const maxHandleLength = 20

export const mostNominationsMin = 5
export const mostNominations = nominationsByFilm(nominees)
  .filter(({ nominations }) => nominations.length >= mostNominationsMin)

export const bigOneEveryWinPoints = 100
export const bigOnePicturePoints = 700

export const basicCategoryPoints = 100
export const basicCategories = [
  "DIRECTING",
  "ACTOR",
  "ACTRESS",
  "SUPPORTING_ACTOR",
  "SUPPORTING_ACTRESS",
  "ORIGINAL_SCREENPLAY",
  "ADAPTED_SCREENPLAY",
  "CINEMATOGRAPHY",
  "EDITING",
  "SCORE"
]

export const minExtras = 3
