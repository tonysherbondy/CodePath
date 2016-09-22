import React, { Component } from 'react'
import {
  View,
  Animated,
} from 'react-native'

class ProgressiveImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highLoaded: false,
      opacityThumbnail: new Animated.Value(0),
    }
    this.onLoad = this.onLoad.bind(this)
    this.onLoadThumbnail = this.onLoadThumbnail.bind(this)
  }
  onLoad() {
    this.setState({
      highLoaded: true,
    })
    Animated.timing(this.state.opacityThumbnail, {
      toValue: 0,
      duration: 250,
    }).start()
  }
  onLoadThumbnail() {
    if (this.state.highLoaded) return
    Animated.timing(this.state.opacityThumbnail, {
      toValue: 1,
      duration: 250,
    }).start()
  }
  render() {
    return (
      <View style={[this.props.style, { backgroundColor: 'rgba(182, 182, 182, 0)' }]}>
        <Animated.Image
          source={this.props.source}
          style={[this.props.style, {
            position: 'absolute',
            width: this.state.width,
            height: this.state.height,
          }]}
          resizeMode={this.props.resizeMode}
          onLoad={this.onLoad}
        />
        <Animated.Image
          source={this.props.thumbnail}
          resizeMode={this.props.resizeMode}
          style={[this.props.style, { opacity: this.state.opacityThumbnail }]}
          onLoad={this.onLoadThumbnail}
          onLayout={e => {
            const { nativeEvent: { layout: { width, height } } } = e
            this.setState({ width, height })
          }}
        />
      </View>
    )
  }
}

ProgressiveImage.propTypes = {
  style: View.propTypes.style,
  resizeMode: React.PropTypes.string,
  source: React.PropTypes.object.isRequired,
  thumbnail: React.PropTypes.object.isRequired,
}

export default ProgressiveImage
