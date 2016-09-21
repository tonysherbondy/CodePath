import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  ListView,
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
    borderWidth: 2,
    borderColor: 'rgb(82, 56, 235)',
  },
})

class App extends React.Component {
  state = {
    query: '',
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  }
  componentDidMount() {
    this.fetchNew()
  }
  onSearch = () => {
    this.fetchNew()
  }
  fetchNew() {
    const { query } = this.state
    fetchArticles({ query, page: 0 })
      .then(articles => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(articles),
        })
      })
      .catch(error => console.error(error))
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
          <Button onPress={this.onSearch}>
            Search
          </Button>
        </View>
        <ListView
          style={styles.grid}
          renderRow={article => <ArticleItem article={article} />}
          dataSource={this.state.dataSource}
        />
      </View>
    )
  }
}

export default App
