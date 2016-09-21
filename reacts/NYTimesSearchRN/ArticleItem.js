import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    elevation: 2,
  },
})

class ArticleItem extends React.Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
  }
  render() {
    const { article } = this.props
    return (
      <View style={styles.container}>
        <Text>{article.headline.main}</Text>
      </View>
    )
  }
}

export default ArticleItem
