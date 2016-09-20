import React, { PropTypes } from 'react'
import {
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import * as constants from './constants'

const styles = StyleSheet.create({
  view: {
    margin: 5,
    borderRadius: 2,
    backgroundColor: constants.colorControlNormal,
  }
})

const Button = ({ onPress, children }) => {
  return (
    <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={styles.view}>
        <Text style={{margin: 5}}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}

// const Button = ({ onPress, children }) => {
//   return (
//   )
// }
Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Button
