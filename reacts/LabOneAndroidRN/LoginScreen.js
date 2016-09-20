import React from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Image,
} from 'react-native'
import * as constants from './constants'
import Button from './Button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBox: {
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
  },
  text: {
    color: constants.colorControlNormal,
    fontSize: 15,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

const LoginScreen = () => {
  return (
    <Image
      style={styles.image}
      resizeMode={Image.resizeMode.cover}
      source={require('./images/rio.jpg')}>
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
        <View style={styles.buttonRow}>
          <Button onPress={() => console.log('cancela')}>Cancela</Button>
          <Button onPress={() => console.log('login')}>Login</Button>
        </View>
      </View>
    </Image>
  )
}

export default LoginScreen
