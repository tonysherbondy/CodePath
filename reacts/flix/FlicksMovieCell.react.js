import React, { PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import * as api from './api'
import ProgressiveImage from './ProgressiveImage.react'
import { TEXT_WHITE } from './constants'

const IMAGE_HEIGHT = 100

const styles = StyleSheet.create({
  cellContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: IMAGE_HEIGHT,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: TEXT_WHITE,
  },
  moreDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  overview: {
    marginTop: 10,
    fontSize: 12,
    color: 'rgba(223, 223, 223, 0.7)',
  },
  image: {
    height: IMAGE_HEIGHT,
    width: 80,
  },
})

const getScoreStyle = score => {
  const baseStyle = { marginLeft: 10 }
  if (score < 5) {
    return {
      ...baseStyle,
      color: 'rgb(246, 157, 52)',
    }
  }
  return {
    ...baseStyle,
    color: 'rgb(101, 242, 84)',
  }
}

const FlickMovieCell = ({
  movie,
  onPress,
}) => (
  <TouchableHighlight
    underlayColor="rgb(147, 147, 147)"
    onPress={() => { onPress(movie) }}
  >
    <View style={styles.cellContainer}>
      <ProgressiveImage
        style={styles.image}
        resizeMode="contain"
        thumbnail={{ uri: api.getImageURILow(movie.poster_path) }}
        source={{ uri: api.getImageURIHigh(movie.poster_path) }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={styles.moreDetailsContainer}>
          <Text style={styles.overview} numberOfLines={1}>
            {movie.date.getFullYear()}
          </Text>
          <Text style={[styles.overview, getScoreStyle(movie.score)]} numberOfLines={1}>
            {movie.score}
          </Text>
        </View>
        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
)
FlickMovieCell.propTypes = {
  movie: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}
export default FlickMovieCell
