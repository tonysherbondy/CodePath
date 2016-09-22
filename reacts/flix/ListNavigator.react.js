import React, { Component } from 'react'
import {
  Navigator,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import renderScene, { getInitialRoute } from './renderFlicksScene.react'
import { DARK_COLOR, TEXT_WHITE, NAV_BAR_COLOR } from './constants'

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: NAV_BAR_COLOR,
    height: 60,
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: TEXT_WHITE,
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarButtonText: {
    color: TEXT_WHITE,
  },
})

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index) {
    if (index === 0) {
      return null
    }
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}
      >
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {route.buttonLabel}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton() {
    return null
  },

  Title(route) {
    const title = route.id === 'master' ? route.title : ''
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {title}
      </Text>
    );
  },

};

class ListNavigator extends Component {
  render() {
    const { queryType } = this.props
    const renderSceneWithQuery = (route, navigator) => (
      renderScene(queryType, route, navigator)
    )
    return (
      <Navigator
        style={{ backgroundColor: DARK_COLOR }}
        initialRoute={getInitialRoute(queryType)}
        renderScene={renderSceneWithQuery}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    )
  }
}
ListNavigator.propTypes = {
  queryType: React.PropTypes.string,
}

export default ListNavigator
