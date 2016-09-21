import React from 'react'
import {
  Navigator,
  BackAndroid,
} from 'react-native'
import Search from './Search'
import ArticleWebView from './ArticleWebView'

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
          <Search
            onClickArticle={article => {
              navigator.push({ key: 'article', article })
            }}
          />
        )
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{ key: 'search' }}
        renderScene={this.renderScene}
      />
    )
  }
}

export default App
