export const nominationsByFilm = nominations => {

  const result = {}

  for (let category in nominations)
  {
    const nominees = nominations[category]
    nominees.forEach(({ film, recipients }) => {
      if (!result[film])
        result[film] = []

      result[film] = [
        ...result[film],
        {
          category,
          recipients: recipients
        }
      ]

    })
  }

  const sortedKeys = Object
    .keys(result)
    .sort((a, b) => result[b].length - result[a].length)

  return sortedKeys.map(film => ({
    film, nominations: result[film]
  }))

}

export const capsToDisplay = (str='') => str
  .replace(/_/g, " ")
  .replace(/\w\S*/g, word =>
    word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
