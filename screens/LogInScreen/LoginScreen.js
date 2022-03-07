import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/logo.png')}
      />
      <TextInput
        style={styles.TextInput}
        placeholder='name..'
        onChangeText={(name) => setName(name)}
        
      ></TextInput>
      <TextInput
        style={styles.TextInput}
        placeholder='address..'
        onChangeText={(address) => setAddress(address)}
      ></TextInput>
      <Button title='login' onPress={()=> navigation.navigate('DraweNavigator')}></Button>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    textTransform: 'capitalize',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  TextInput: {
    borderWidth: 1,
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderColor: '#f1f1df',
    color: '#4c4747',
    borderRadius: 4,
  },
})