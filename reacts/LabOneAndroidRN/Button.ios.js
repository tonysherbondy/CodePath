import React, { PropTypes } from 'react'
import {
  TouchableOpacity,
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
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1},
  }
})

const Button = ({ onPress, children, styles: ownStyles }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.view, ownStyles]}>
        <Text style={{margin: 10, color: 'black'}}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Button
