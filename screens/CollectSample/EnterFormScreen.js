import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const EnterFormScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();

  function handleSubmit(){
    navigation.navigate('SignatureCanvas', {
      name : name,
      address: address,
      age: age,
      phone : phone,
    })
  }
  return (
    <View style={styles.container}>
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
      <TextInput
        style={styles.TextInput}
        placeholder='age..'
        onChangeText={(age) => setAge(age)}
        keyboardType= 'numeric'
      ></TextInput>
      <TextInput
        style={styles.TextInput}
        placeholder='phone..'
        onChangeText={(phone) => setPhone(phone)}
        keyboardType= 'numeric'
      ></TextInput>
      
      <Button title='submit' onPress={handleSubmit}></Button>
    </View>
  )
}

export default EnterFormScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: '#fefefe'
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