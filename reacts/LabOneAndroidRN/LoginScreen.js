import React from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'
import * as constants from './constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(158, 130, 84)',
    justifyContent: 'center',
  },
  loginBox: {
    backgroundColor: 'rgba(34, 34, 34, 0.48)',
  },
  text: {
    color: constants.colorControlNormal,
    fontSize: 15,
  }
})

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.text}>Login a Cidade Maravilhosa!</Text>
        <TextInput
          style={styles.text}
          keyboardType="email-address"
          placeholder="E-mail"
          placeholderTextColor={constants.colorControlNormal}
        />
        <TextInput
          style={styles.text}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={constants.colorControlNormal}
        />
      </View>
    </View>
  )
}

export default LoginScreen
