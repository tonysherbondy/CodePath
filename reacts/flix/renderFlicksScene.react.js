import React from 'react'
import FlicksViewer from './FlicksViewer.react'
import FlicksDetailsViewer from './FlicksDetailsViewer.react'
import VideoViewer from './VideoViewer.react'

const getDetailsRoute = movie => ({
  id: 'details',
  title: movie.title,
  buttonLabel: 'Back',
  movie,
})

const getVideoRoute = uri => ({
  id: 'video',
  buttonLabel: 'Details',
  uri,
})

const renderScene = (queryType, route, navigator) => {
  if (route.id === 'master') {
    return (
      <FlicksViewer
        queryType={queryType}
        onSelectRow={movie => {
          navigator.push(getDetailsRoute(movie))
        }}
      />
    )
  } else if (route.id === 'video') {
    return (
      <VideoViewer uri={route.uri} />
    )
  }
  return (
    <FlicksDetailsViewer
      movie={route.movie}
      onShowVideo={uri => {
        navigator.push(getVideoRoute(uri))
      }}
    />
  )
}

export default renderScene

export const getInitialRoute = (queryType) => ({
  title: queryType === 'now_playing' ? 'Now Playing' : 'Top Rated',
  id: 'master',
})
