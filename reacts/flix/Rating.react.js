import React, { Component, PropTypes } from 'react'
import {
  Image,
  StyleSheet,
  View,
} from 'react-native'
const selectedIcon = require('./images/select_rating.png') // eslint-disable-line
const unselectedIcon = require('./images/unselect_rating.png') // eslint-disable-line

const styles = StyleSheet.create({
  icon: {
    width: 30,
  },
  container: {
    flexDirection: 'row',
    height: 40,
  },
})

class Rating extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
  }
  render() {
    const { rating } = this.props
    const stars = [1, 2, 3, 4, 5].map(id => (
      <Image
        key={id}
        style={styles.icon}
        source={rating >= id * 2 ? selectedIcon : unselectedIcon}
        resizeMode="contain"
      />
    ))
    return (
      <View style={styles.container}>
        {stars}
      </View>
    )
  }
}

export default Rating
