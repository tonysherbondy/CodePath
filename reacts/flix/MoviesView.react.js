import React from 'react'
import {
  ListView,
  Text,
} from 'react-native'
import MovieCellView from './MovieCellView.react'
import { fetchMovies } from './api'

class MoviesView extends React.Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds,
      loading: true,
    }
  }
  componentDidMount() {
    fetchMovies()
    .then(movies => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
        loading: false,
      })
    })
    .catch(error => {
      console.log(error.msg)
      this.setState({
        loading: false,
      })
    })
  }
  renderRow(movie) {
    return (
      <MovieCellView movie={movie} />
    )
  }
  render() {
    if (this.state.loading) {
      return <Text style={{ marginTop: 20 }}>Loading...</Text>
    }
    return (
      <ListView
        style={{ marginTop: 20 }}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

export default MoviesView
