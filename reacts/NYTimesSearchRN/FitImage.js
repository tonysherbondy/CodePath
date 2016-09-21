import React, { PropTypes } from 'react'
import {
  Image,
} from 'react-native'

class FitImage extends React.Component {
  static propTypes = {
    source: PropTypes.object.isRequired,
    style: Image.propTypes.style,
  }
  state = {
    // Original size of image resource
    originalHeight: 0,
    originalWidth: 0,
    // Width to render
    width: 0,
  }
  componentDidMount() {
    Image.getSize(
      this.props.source.uri,
      (originalWidth, originalHeight) => {
        this.setState({ originalWidth, originalHeight })
      },
      error => {
        console.error(error)
      }
    )
  }
  onLayout = ({ nativeEvent }) => {
    this.setState({ width: nativeEvent.layout.width })
  }
  render() {
    const { originalWidth, originalHeight, width } = this.state
    let height = 0
    if (originalWidth !== 0 && originalHeight !== 0 && width !== 0) {
      height = originalHeight / originalWidth * width
    }
    return (
      <Image
        {...this.props}
        style={[this.props.style, { height }]}
        onLayout={this.onLayout}
      />
    )

  }
}

export default FitImage
