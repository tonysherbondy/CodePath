import React from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native'
import * as constants from './constants'
import Button from './Button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBox: {
    backgroundColor: 'rgba(34, 34, 34, 0.7)',
    padding: 20,
  },
  text: {
    color: constants.colorControlNormal,
    fontSize: 20,
  },
  textLabel: {
    textAlign: 'center',
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
  },
  loginButton: {
    backgroundColor: constants.colorAccent,
  },
  forgotLabel: {
    color: constants.colorAccent,
    fontSize: 13,
  },
  input: {
    height: 50,
  }
})

const onBtn = msg => () => ToastAndroid.show(msg, ToastAndroid.SHORT)

const LoginScreen = () => {
  return (
    <Image
      style={styles.image}
      resizeMode={Image.resizeMode.cover}
      source={require('./images/rio.jpg')}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.loginBox}>
        <Text style={[styles.text, styles.textLabel]}>Login a Cidade Maravilhosa!</Text>
        <TextInput
          style={[styles.text, styles.input]}
          keyboardType="email-address"
          placeholder="E-mail"
          placeholderTextColor={constants.colorControlNormal}
          />
        <TextInput
          style={[styles.text, styles.input]}
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor={constants.colorControlNormal}
          />
        <View style={styles.buttonRow}>
          <Button onPress={onBtn('Cancela')}>CANCELA</Button>
          <Button styles={styles.loginButton} onPress={onBtn('Login')}>LOGIN</Button>
        </View>
        <TouchableOpacity onPress={onBtn('Esqueci')}>
          <Text style={[styles.text, styles.textLabel, styles.forgotLabel]}>
            Opa, esqueci minha senha!
          </Text>
        </TouchableOpacity>
      </View>
    </Image>
  )
}

export default LoginScreen
