import { nominationsByFilm } from 'config/util'
import nominees from 'config/nominees'

export const recaptchaTargetId = 'recaptcha-phone-auth-target'
export const maxHandleLength = 20

export const mostNominationsMin = 5
export const mostNominations = nominationsByFilm(nominees)
  .filter(({ total }) => total >= mostNominationsMin)

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

// Points

export const basicCategoryPoints = 100
