import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native'
import * as api from './api'
import FlickMovieCell from './FlicksMovieCell.react'

import {
  DARK_COLOR,
  HIGHLIGHT_COLOR,
  TEXT_WHITE,
  NAV_BAR_HEIGHT,
  getTabBarMargin,
} from './constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: NAV_BAR_HEIGHT,
    backgroundColor: DARK_COLOR,
    marginBottom: getTabBarMargin(),
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    backgroundColor: HIGHLIGHT_COLOR,
  },
  errorText: {
    color: 'white',
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
})

class FlicksViewer extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource,
      loaded: false,
      refreshing: false,
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }
  componentDidMount() {
    this.fetchNowPlaying()
  }
  onRefresh() {
    this.setState({
      refreshing: true,
    })
    api.fetchMovies(this.props.queryType, movies => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
        refreshing: false,
      })
    }).catch(error => {
      this.setState({
        error,
        refreshing: false,
        loaded: true,
      })
    })
  }
  fetchNowPlaying() {
    this.setState({
      loaded: false,
    })
    api.fetchMovies(this.props.queryType, movies => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
        loaded: true,
      })
    }).catch(error => {
      this.setState({
        error,
        loaded: true,
      })
    })
  }
  renderRow(rowData) {
    return (
      <FlickMovieCell
        movie={rowData}
        onPress={this.props.onSelectRow}
      />
    )
  }
  render() {
    if (!this.state.loaded) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator
            animating={this.state.animating}
            color={TEXT_WHITE}
            style={{ marginTop: -100 }}
            size="large"
          />
        </View>
      )
    }
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              Error: {this.state.error}
            </Text>
          </View>
        </View>
      )
    }
    return (
      <ListView
        refreshControl={
          <RefreshControl
            tintColor={TEXT_WHITE}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        showsVerticalScrollIndicator={false}
      />
    )
  }
}

FlicksViewer.propTypes = {
  onSelectRow: React.PropTypes.func.isRequired,
  queryType: React.PropTypes.string,
}
export default FlicksViewer
