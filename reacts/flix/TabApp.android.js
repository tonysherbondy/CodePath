import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import ListNavigator from './ListNavigator.react'
import {
  NAV_BAR_COLOR,
  TAB_BAR_HEIGHT,
  TEXT_WHITE,
} from './constants'

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: NAV_BAR_COLOR,
    height: TAB_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabText: {
    color: TEXT_WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
  unselectedText: {
    color: 'rgb(140, 140, 140)',
  },
})

class TabApp extends React.Component {
  state = {
    queryType: 'top_rated',
  }
  renderTopRated() {
    return (
      <ListNavigator queryType="top_rated" />
    )
  }
  renderNowPlaying() {
    return (
      <ListNavigator queryType="now_playing" />
    )
  }
  render() {
    const tabPress = queryType => () => {
      this.setState({ queryType })
    }
    const selectedStyle = queryType => (
      this.state.queryType !== queryType ? styles.unselectedText : null
    )

    return (
      <View style={{ flex: 1 }}>
        {this.state.queryType === 'now_playing' ?
          this.renderNowPlaying() :
          this.renderTopRated()
        }
        <View style={styles.tabBar}>
          <TouchableWithoutFeedback
            onPress={tabPress('now_playing')}
          >
            <View>
              <Text style={[styles.tabText, selectedStyle('now_playing')]}>
                Now Playing
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={tabPress('top_rated')}
          >
            <View>
              <Text style={[styles.tabText, selectedStyle('top_rated')]}>
                Top Rated
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

export default TabApp
