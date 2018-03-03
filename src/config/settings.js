import { nominationsByFilm } from 'config/util'
import nominees from 'config/nominees'

export const navbarTopHeight = '4.8rem'
export const navbarBottomHeight = '6rem'
export const desktopBreakpointPx = 720

export const personalLink = 'https://github.com/gnordhielm'
// export const personalLink = 'http://www.gusnordhielm.com/'
export const oscars2018Time = "2018/03/04 17:30:00 UTC"

export const maxHandleLength = 30

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

export const filmIconLookup = {
  "CALL_ME_BY_YOUR_NAME": "call_me_by",
  "DARKEST_HOUR": "darkest_hour",
  "DUNKIRK": "dunkirk",
  "GET_OUT": "get_out",
  "LADY_BIRD": "lady_bird",
  "PHANTOM_THREAD": "phantom_thread",
  "THREE_BILLBOARDS_OUTSIDE_EBBING,_MISSOURI": "billboards",
  "THE_SHAPE_OF_WATER": "shape_of_water",
  "THE_POST": "the_post",
  "FALLBACK": "fallback",
}
