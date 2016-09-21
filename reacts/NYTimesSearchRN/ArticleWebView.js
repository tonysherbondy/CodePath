import React, { PropTypes } from 'react'
import {
  WebView,
} from 'react-native'

const ArticleWebView = ({ article }) => (
  <WebView style={{ flex: 1 }} source={{ uri: article.webUrl }} />
)
ArticleWebView.propTypes = {
  article: PropTypes.object.isRequired,
}

export default ArticleWebView
