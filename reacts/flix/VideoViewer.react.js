import React from 'react'
import {
  WebView,
  StyleSheet,
} from 'react-native'
import {
  NAV_BAR_HEIGHT,
  TAB_BAR_HEIGHT,
} from './constants'

const styles = StyleSheet.create({
  view: {
    marginTop: NAV_BAR_HEIGHT,
    marginBottom: TAB_BAR_HEIGHT,
  },
})

const VideoViewer = ({ uri }) => (
  <WebView
    style={styles.view}
    source={{ uri }}
  />
)
VideoViewer.propTypes = {
  uri: React.PropTypes.string.isRequired,
}
export default VideoViewer
