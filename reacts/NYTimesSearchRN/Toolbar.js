import React, { PropTypes } from 'react'
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

const Toolbar = ({ onSettings }) => (
  <ToolbarAndroid
    style={styles.toolbar}
    title="NYTimesSearchRN"
    actions={actions}
    onActionSelected={() => onSettings()}
  />
)
Toolbar.propTypes = {
  onSettings: PropTypes.func.isRequired,
}

export default Toolbar
