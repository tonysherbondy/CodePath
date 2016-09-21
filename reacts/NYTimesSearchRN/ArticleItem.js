import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
import FitImage from './FitImage'

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    elevation: 2,
  },
  image: {
  },
})

class ArticleItem extends React.Component {
  static propTypes = {
    style: View.propTypes.style,
    article: PropTypes.object.isRequired,
  }
  render() {
    const { article, style } = this.props
    return (
      <View style={[styles.container, style]}>
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
