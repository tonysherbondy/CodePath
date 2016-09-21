import React from 'react'
import {
  ToolbarAndroid,
  StyleSheet,
} from 'react-native'
import * as constants from './constants'

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: constants.colorPrimary,
  },
})

const actions = [
  { title: 'Settings', show: 'ifRoom' },
]

const Toolbar = () => (
  <ToolbarAndroid
    style={styles.toolbar}
    title="NYTimesSearchRN"
    actions={actions}
  />
)

export default Toolbar
