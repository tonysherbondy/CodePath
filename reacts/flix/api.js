const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json'
const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed'
const URL_PREFIX = 'https://api.themoviedb.org/3/movie'
const NOW_PLAYING_URL = `${URL_PREFIX}/now_playing`
const TOP_RATED_URL = `${URL_PREFIX}/top_rated`
import mockData from './mockData'

const parseMovies = data => (
  data.results.map(d => ({
    id: d.id,
    title: d.original_title,
    overview: d.overview,
    poster_path: d.poster_path,
    backdrop_path: d.backdrop_path,
    date: new Date(d.release_date),
    score: d.vote_average,
  }))
)

const isError = false
export const fetchNowPlayingMock = (queryType, cb) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError) {
        reject('Unable to connect to network')
      }
      resolve(mockData)
    }, 700)
  })
  .then(parseMovies)
  .then(d => {
    if (queryType === 'top_rated' && d.length && d.length > 6) {
      return d.slice(d.length - 5)
    }
    return d
  })
  .then(cb)
)

export const fetchData = cb => (
  fetch(REQUEST_URL)
    .then(response => response.json())
    .then(parseMovies)
    .then(cb)
    .done()
)

const getMoviesURL = queryType => (
  `${queryType === 'top_rated' ? TOP_RATED_URL : NOW_PLAYING_URL}?api_key=${API_KEY}`
)

export const fetchMovies = (queryType, cb) => (
  fetch(getMoviesURL(queryType))
    .then(response => response.json())
    .then(d => {
      if (d.status_code && d.status_code === 7) {
        // eslint-disable-next-line no-console
        console.warn('Problem fetching data because', d.status_message)
        throw new Error(d.status_code)
      }
      return d
    })
    .then(parseMovies)
    .then(cb)
)

export const fetchTrailerURL = (id, cb) => (
  fetch(`${URL_PREFIX}/${id}/videos?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(d => {
      if (d.results && d.results.length > 0) {
        const trailer = d.results.find(r => r.type === 'Trailer') || d.results[0]
        return `https://www.youtube.com/watch?v=${trailer.key}`
      }
      return null
    })
    .then(cb)
    .catch(error => {
      console.warn(error) // eslint-disable-line no-console
    })
    .done()
)

const imageURIPrefixHigh = 'https://image.tmdb.org/t/p/original'
const imageURIPrefixLow = 'https://image.tmdb.org/t/p/w45'
export const getImageURIHigh = imagePath => `${imageURIPrefixHigh}/${imagePath}`
export const getImageURILow = imagePath => `${imageURIPrefixLow}/${imagePath}`
export const getImageURISlow = () => `http://localhost:3000/image${Math.random()}.png`
