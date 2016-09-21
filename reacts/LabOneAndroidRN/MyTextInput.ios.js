import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import * as constants from './constants'

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: constants.colorControlNormal,
  }
})

const MyTextInput = (props) => {
  return (
    <View style={styles.container}>
      <TextInput {...props} />
    </View>
  )
}

export default MyTextInput
