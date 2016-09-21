const url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json'
const apiKey = 'f886fb17fa1d44a280f905ea197e6f66'
const esc = encodeURIComponent
const getQueryParamsString = ({ q, page }) => (
  q.length === 0 ?
  `?api-key=${esc(apiKey)}&page=${esc(page)}` :
  `?api-key=${esc(apiKey)}&q=${esc(q)}&page=${esc(page)}`
)

const getThumbnail = article => {
  const { multimedia: m } = article
  return m && m.length > 0 ? `http://www.nytimes.com/${m[0].url}` : null
}

export const fetchArticles = async ({ query: q, page }) => {
  const queryString = getQueryParamsString({ q, page })
  const fetchUrl = url + queryString
  console.log('fetching', fetchUrl)
  try {
    const response = await fetch(fetchUrl)
    const responseJson = await response.json()
    if (responseJson.status === 'ERROR') {
      throw responseJson.errors
    }
    const { docs: articles } = responseJson.response
    return articles.map(article => ({
      ...article,
      thumbnail: getThumbnail(article),
    }))
  } catch (error) {
    console.error(error)
  }
  return null
}
