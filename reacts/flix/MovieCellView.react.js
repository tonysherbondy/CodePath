import React, { PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'
const imageURIPrefix = 'https://image.tmdb.org/t/p/original'
const getPosterURI = movie => `${imageURIPrefix}/${movie.poster_path}`

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    paddingLeft: 0,
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    color: 'rgb(57, 57, 57)',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

class MovieCellView extends React.Component {
  render() {
    const { movie } = this.props
    return (
      <View style={styles.rowContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: getPosterURI(movie) }}
        />
        <View style={styles.textContainer}>
          <Text
            style={[styles.text, styles.title]}
            numberOfLines={1}
          >
            {movie.title}
          </Text>
          <Text
            style={styles.text}
            numberOfLines={3}
          >
            {movie.overview}
          </Text>
        </View>
      </View>
    )
  }
}
MovieCellView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
}
export default MovieCellView
