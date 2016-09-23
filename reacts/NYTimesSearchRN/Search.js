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
    filter: PropTypes.object.isRequired,
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.fetchNew(this.state.query, nextProps.filter)
    }
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
  endReachedThreshold = 400
  cellsPerRow = 3
  articles = []
  pageToFetch = 0
  numTotalArticles = 0
  fetchNew(query, filter) {
    this.articles = []
    this.pageToFetch = 0
    this.numTotalArticles = 0
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.articles),
    })
    if (this.listView) {
      this.listView.scrollTo({ y: 0 })
    }
    this.fetchNextPage(query, filter)
  }
  fetchNextPage(query = this.state.query, filter = this.props.filter) {
    console.log('fetching with filter', filter)
    fetchArticles({ query, filter, page: this.pageToFetch })
      .then(({ articles, numTotalArticles }) => {
        this.articles = this.articles.concat(articles)
        this.numTotalArticles = numTotalArticles
        this.pageToFetch++
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.articles),
        })
      })
      .catch(error => console.error(error))

  }
  handleEndReached = () => {
    if (this.articles.length < this.numTotalArticles) {
      this.fetchNextPage();
    }
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
          ref={v => (this.listView = v)}
          enableEmptySections
          pageSize={this.cellsPerRow}
          style={styles.grid}
          contentContainerStyle={styles.gridContent}
          renderRow={this.renderRow}
          dataSource={this.state.dataSource}
          onLayout={this.onLayoutGrid}
          onEndReached={this.handleEndReached}
          onEndReachedThreshold={this.endReachedThreshold}
        />
      </View>
    )
  }
}

export default Search
