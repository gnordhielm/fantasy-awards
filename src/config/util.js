export const nominationsByFilm = nominations => {

  const nominationTotals = {}

  for (let key in nominations)
  {
    const category = nominations[key]
    category.forEach(({ film }) => {
      nominationTotals[film] = nominationTotals[film] === undefined ?
        0 : (nominationTotals[film] + 1)
    })
  }

  const films = Object
    .keys(nominationTotals)
    .sort((a, b) => {
      return nominationTotals[b] - nominationTotals[a]
    })

  return films.map(film => ({
    film, totalNominations: nominationTotals[film]
  }))

}

export const capsToDisplay = (str='') => str
  .replace(/_/g, " ")
  .replace(/\w\S*/g, word =>
    word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
