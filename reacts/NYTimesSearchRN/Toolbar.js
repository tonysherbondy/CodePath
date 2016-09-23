import React, { PropTypes } from 'react'
import {
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as constants from './constants'

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: constants.colorPrimary,
  },
})

const actions = [
  {
    title: 'Settings',
    show: 'ifRoom',
    iconName: 'settings',
    iconSize: 24,
    iconColor: 'white',
  },
]

const Toolbar = ({ onSettings }) => (
  <Icon.ToolbarAndroid
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
