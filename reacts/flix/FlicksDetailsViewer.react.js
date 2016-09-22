import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import ProgressiveImage from './ProgressiveImage.react'
import * as api from './api'
import {
  NAV_BAR_HEIGHT,
  TEXT_WHITE,
  TAB_BAR_HEIGHT,
  MISSING_IMAGE_COLOR,
} from './constants'
import Rating from './Rating.react'
const playIcon = require('./images/play_icon.png') // eslint-disable-line

const TEXT_PADDING = 5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: NAV_BAR_HEIGHT,
    marginBottom: TAB_BAR_HEIGHT,
  },
  scrollView: {
    flex: 1,
  },
  backdrop: {
    height: 180,
    backgroundColor: MISSING_IMAGE_COLOR,
  },
  playIconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: 50,
    height: 50,
    opacity: 0.8,
  },
  topRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topDetails: {
    flex: 1,
    paddingRight: TEXT_PADDING,
    paddingTop: TEXT_PADDING,
    paddingLeft: TEXT_PADDING,
  },
  overviewDetails: {
    padding: TEXT_PADDING,
    paddingTop: 2 * TEXT_PADDING,
  },
  topDetailsText: {
    fontSize: 13,
    color: TEXT_WHITE,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  overviewText: {
    fontSize: 11,
    color: TEXT_WHITE,
  },
})

class DetailsViewer extends Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    onShowVideo: PropTypes.func.isRequired,
  }
  state = {
    width: 320,
    height: 321,
    backdropLayout: null,
  }
  componentDidMount() {
    this.fetchVideoInfo()
  }
  onBackdropLayout = ({ nativeEvent: { layout } }) => {
    const { backdropLayout } = this.state
    if (!backdropLayout
    || backdropLayout.width !== layout.width
    || backdropLayout.height !== layout.height) {
      this.setState({
        backdropLayout: layout,
      })
    }
  }
  onContainerLayout = ({ nativeEvent }) => {
    // TODO - check on Android
    const { width, height } = nativeEvent.layout
    this.setState({
      width,
      height,
    })
  }
  fetchVideoInfo() {
    const { movie } = this.props
    api.fetchTrailerURL(movie.id, videoURL => {
      this.setState({
        videoURL,
      })
    })
  }
  renderTopDetails(movie) {
    return (
      <View style={[styles.topDetails]}>
        <Text style={[styles.topDetailsText, styles.title]} numberOfLines={0}>
          {movie.title}
        </Text>
        <Text style={styles.topDetailsText} numberOfLines={1}>
          {`Released ${movie.date.getFullYear()}`}
        </Text>
        <Rating rating={movie.score} />
      </View>
    )
  }
  renderBackdrop(movie, width) {
    if (!movie.backdrop_path) return null
    return (
      <View style={[styles.backdrop, { width }]} onLayout={this.onBackdropLayout}>
        <ProgressiveImage
          source={{ uri: api.getImageURIHigh(movie.backdrop_path) }}
          thumbnail={{ uri: api.getImageURILow(movie.backdrop_path) }}
          resizeMode="cover"
          style={{ flex: 1 }}
        />
        {this.renderVideoIconOverlay()}
      </View>
    )
  }
  renderVideoIconOverlay() {
    const { videoURL, backdropLayout } = this.state
    if (videoURL && backdropLayout) {
      const { width, height } = backdropLayout
      return (
        <TouchableOpacity
          style={[styles.playIconContainer, { width, height }]}
          onPress={() => this.props.onShowVideo(videoURL)}
        >
          <Image style={styles.playIcon} source={playIcon} />
        </TouchableOpacity>
      )
    }
    return null
  }
  renderTopRow(movie) {
    const { width, height } = this.state
    const isPortrait = height > width
    if (isPortrait) {
      return (
        <View style={styles.topRow}>
          {this.renderBackdrop(movie, width)}
          {this.renderTopDetails(movie)}
        </View>
      )
    }
    const landscapeWidth = height + NAV_BAR_HEIGHT + TAB_BAR_HEIGHT
    return (
      <View style={styles.topRow}>
        {this.renderTopDetails(movie)}
        {this.renderBackdrop(movie, landscapeWidth)}
      </View>
    )
  }
  render() {
    const { movie } = this.props
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} onLayout={this.onContainerLayout}>
          {this.renderTopRow(movie)}
          <View style={styles.overviewDetails}>
            <Text style={styles.overviewText} numberOfLines={Infinity}>
              {movie.overview}
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
export default DetailsViewer
