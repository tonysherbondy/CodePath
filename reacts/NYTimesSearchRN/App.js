import React from 'react'
import {
  Navigator,
  BackAndroid,
  View,
} from 'react-native'
import Search from './Search'
import ArticleWebView from './ArticleWebView'
import Toolbar from './Toolbar'
import SettingsModal from './SettingsModal'
import * as constants from './constants'

class App extends React.Component {
  state = {
    settingsModalVisible: false,
    filter: {
      beginDate: null,
      sortOrder: constants.ORDER_NEWEST,
      ndArts: false,
      ndFashion: false,
      ndSports: false,
    },
  }
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBack)
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleAndroidBack)
  }
  handleAndroidBack = () => {
    // TODO - how to handle dialog transitions here
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop()
      return true
    }
    return false
  }
  saveSettings = filter => {
    this.setState({ filter, settingsModalVisible: false })
  }
  renderScene = (route, navigator) => {
    this.navigator = navigator
    switch (route.key) {
      case 'article':
        return (
          <ArticleWebView article={route.article} />
        )
      case 'search':
      default:
        return (
          <View style={{ flex: 1 }}>
            <Toolbar onSettings={() => this.setState({ settingsModalVisible: true })} />
            <SettingsModal
              filter={this.state.filter}
              visible={this.state.settingsModalVisible}
              onSave={this.saveSettings}
              onDismissModal={() => this.setState({ settingsModalVisible: false })}
            />
            <Search
              onClickArticle={article => {
                navigator.push({ key: 'article', article })
              }}
            />
          </View>
        )
    }
  }
  render() {
    return (
      <Navigator
        configureScene={() => Navigator.SceneConfigs.FloatFromBottomAndroid}
        initialRoute={{ key: 'search' }}
        renderScene={this.renderScene}
      />
    )
  }
}

export default App
