const url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json'
const apiKey = 'f886fb17fa1d44a280f905ea197e6f66'
const esc = encodeURIComponent
const getQueryParamsString = ({ q, page, filter }) => {
  let queryParamsString = `?api-key=${esc(apiKey)}&page=${esc(page)}`
  if (q && q.length > 0) {
    queryParamsString += `&q=${esc(q)}`
  }
  if (filter.sortOrder) {
    queryParamsString += `&sort=${esc(filter.sortOrder)}`
  }
  if (filter.beginDate) {
    const year = filter.beginDate.getFullYear()
    const day = filter.beginDate.getDate()
    const month = filter.beginDate.getMonth() + 1
    const zeroPad = num => ('00' + num).substr(-2, 2) // eslint-disable-line prefer-template
    queryParamsString += `&begin_date=${year}${zeroPad(month)}${zeroPad(day)}`
  }
  return queryParamsString
}

const getThumbnail = article => {
  const { multimedia: m } = article
  return m && m.length > 0 ? `http://www.nytimes.com/${m[0].url}` : null
}

export const fetchArticles = async ({ query: q, filter, page }) => {
  const queryString = getQueryParamsString({ q, filter, page })
  const fetchUrl = url + queryString
  console.log('fetching', fetchUrl)
  try {
    const response = await fetch(fetchUrl)
    const responseJson = await response.json()
    if (responseJson.status === 'ERROR') {
      throw responseJson.errors
    }
    const { docs: articles, meta: { hits } } = responseJson.response
    return {
      numTotalArticles: hits,
      articles: articles.map(article => ({
        ...article,
        webUrl: article.web_url,
        thumbnail: getThumbnail(article),
      })),
    }
  } catch (error) {
    console.error(error)
  }
  return null
}
