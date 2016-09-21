import React from 'react'
import {
  Navigator,
  BackAndroid,
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import Search from './Search'
import ArticleWebView from './ArticleWebView'
import Toolbar from './Toolbar'

class App extends React.Component {
  state = {
    settingsModalVisible: false,
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
  dismissModal = () => {
    this.setState({ settingsModalVisible: false })
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
            <Modal
              animationType="fade"
              transparent
              visible={this.state.settingsModalVisible}
              onRequestClose={this.dismissModal}
            >
              <TouchableWithoutFeedback onPress={this.dismissModal}>
                <View style={{ flex: 1, backgroundColor: 'rgba(10, 10, 10, 0.4)' }}>
                  <TouchableWithoutFeedback>
                    <View style={{ margin: 50, backgroundColor: 'white' }}>
                      <Text>Hello Modal!</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
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
