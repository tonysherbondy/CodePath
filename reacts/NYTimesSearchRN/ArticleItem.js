import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
import FitImage from './FitImage'

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    elevation: 2,
  },
  image: {
    flex: 1,
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
        {article.thumbnail ?
          <FitImage
            source={{ uri: article.thumbnail }}
            style={styles.image}
          /> :
          null
        }
        <Text>{article.headline.main}</Text>
      </View>
    )
  }
}

export default ArticleItem
