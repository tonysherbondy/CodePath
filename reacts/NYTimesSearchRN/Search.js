import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  ListView,
  TouchableOpacity,
} from 'react-native'
import Button from './Button' // eslint-disable-line import/no-unresolved
import { fetchArticles } from './api'
import ArticleItem from './ArticleItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    height: 50,
  },
  grid: {
    flex: 1,
  },
  gridContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  article: {
    // flex: 1,
  },
})

class Search extends React.Component {
  static propTypes = {
    onClickArticle: PropTypes.func.isRequired,
  }
  state = {
    query: '',
    articleWidth: 0,
    articleMargin: 5,
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  }
  componentDidMount() {
    this.fetchNew()
  }
  onSearch = () => {
    this.fetchNew()
  }
  onLayoutGrid = ({ nativeEvent }) => {
    const { layout } = nativeEvent
    const padding = 2 * this.state.articleMargin
    const articleWidth = Math.floor(layout.width / this.cellsPerRow) - padding
    this.setState({ articleWidth })
  }
  cellsPerRow = 3
  fetchNew() {
    const { query } = this.state
    fetchArticles({ query, page: 0 })
      .then(articles => {
        console.log('articles', articles)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(articles),
        })
      })
      .catch(error => console.error(error))
  }
  renderRow = article => {
    const {
      articleWidth: width,
      articleMargin: margin,
    } = this.state
    return (
      <TouchableOpacity onPress={() => this.props.onClickArticle(article)}>
        <ArticleItem article={article} style={[styles.article, { width, margin }]} />
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={this.state.query}
            onChangeText={query => this.setState({ query })}
          />
          <Button onPress={this.onSearch}>Search</Button>
        </View>
        <ListView
          style={styles.grid}
          contentContainerStyle={styles.gridContent}
          renderRow={this.renderRow}
          dataSource={this.state.dataSource}
          onLayout={this.onLayoutGrid}
        />
      </View>
    )
  }
}

export default Search
