import React from 'react'
import {
  TabBarIOS,
} from 'react-native'
import ListNavigator from './ListNavigator.react'
import { DARK_COLOR } from './constants'
const videoImg = require('./images/video.png') // eslint-disable-line
const starImg = require('./images/star.png') // eslint-disable-line

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'now_playing',
    }
  }
  renderContent(queryType) {
    return (
      <ListNavigator queryType={queryType} />
    );
  }
  render() {
    return (
      <TabBarIOS
        unselectedTintColor="gray"
        tintColor="white"
        barTintColor={DARK_COLOR}
        translucent
      >
        <TabBarIOS.Item
          title="Now Playing"
          icon={videoImg}
          selected={this.state.selectedTab === 'now_playing'}
          onPress={() => {
            this.setState({
              selectedTab: 'now_playing',
            })
          }}
        >
          {this.renderContent('now_playing')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Top Rated"
          icon={starImg}
          selected={this.state.selectedTab === 'top_rated'}
          onPress={() => {
            this.setState({
              selectedTab: 'top_rated',
            })
          }}
        >
          {this.renderContent('top_rated')}
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

export default MainPage
