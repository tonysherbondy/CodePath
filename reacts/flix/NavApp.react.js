import React from 'react'
import {
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  BackAndroid,
  Platform,
  Text,
} from 'react-native'
import ColorView from './ColorView.react'

const routes = [
  { title: 'Purple', color: 'rgb(136, 77, 150)', id: 0 },
  { title: 'Orange', color: 'rgb(244, 178, 66)', id: 1 },
]

let navigatorForBack = null
if (Platform.OS === 'android') {
  BackAndroid.addEventListener('hardwareBackPress', () => {
    if (navigatorForBack && navigatorForBack.getCurrentRoutes().length > 1) {
      navigatorForBack.pop();
      return true;
    }
    return false;
  })
}

class NavApp extends React.Component {
  static propTypes = {
    queryType: React.PropTypes.string.isRequired,
  }
  renderScene = (route, navigator) => {
    navigatorForBack = navigator
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (route.id === 0) {
            navigator.push(routes[1])
          } else {
            navigator.pop()
          }
        }}
        style={{ flex: 1 }}
      >
        <ColorView color={route.color} />
      </TouchableOpacity>
    )
  }
  render() {
    const { queryType } = this.props
    const getTitle = route => `${queryType}: ${route.title}`

    const navigationBar = (
      <Navigator.NavigationBar
        routeMapper={{
          LeftButton: (route, navigator) => {
            if (route.id === 0) {
              return null
            }
            return (
              <TouchableHighlight
                underlayColor="rgb(42, 236, 133)"
                onPress={() => navigator.pop()}
              >
                <Text>Back</Text>
              </TouchableHighlight>
            )
          },
          RightButton: () => null,
          Title: (route) => (<Text>{getTitle(route)}</Text>),
        }}
        style={{ backgroundColor: 'rgb(212, 232, 228)' }}
      />
    )
    return (
      <Navigator
        initialRoute={routes[0]}
        navigationBar={navigationBar}
        renderScene={this.renderScene}
      />
    )
  }
}

export default NavApp
