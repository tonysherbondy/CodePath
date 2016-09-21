import React from 'react'
import {
  Navigator,
  BackAndroid,
  View,
} from 'react-native'
import Search from './Search'
import ArticleWebView from './ArticleWebView'
import Toolbar from './Toolbar'

class App extends React.Component {
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
            <Toolbar />
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
