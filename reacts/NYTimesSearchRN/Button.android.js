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
    elevation: 3,
  }
})

const Button = ({ onPress, children, styles: ownStyles }) => {
  return (
    <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={[styles.view, ownStyles]}>
        <Text style={{margin: 10, color: 'black'}}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Button
