import { Button, Dimensions, Image, StatusBar, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { getLoginApi } from '../../Services/appServices/loginService'
import { Icon, Text } from 'react-native-elements'
import AppButton from '../../components/ui/AppButton'
import { storeUserData } from '../../Services/store/slices/profileSlice'

const windowWidth = Dimensions.get('window').width * 0.9;

const LoginScreen = () => {
  const navigation = useNavigation()
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch()

  const handleLogin = () => {
    // ()=> navigation.navigate('DraweNavigator')
    //   "validuserDetails": [
    //     {
    //         "usrUserId": 3,
    //         "usrusername": "pacific",
    //         "usrrole": 3,
    //         "usrFullName": "Pacific"
    //     }
    // ]
    let data = {
      user: username,
      pass: password
    }
    dispatch(getLoginApi(data, (val) => {
      if (val.length !== 0) {
        let andd = val?.validuserDetails;
        if (andd[0]?.usrUserId > 0) {
          navigation.navigate('DraweNavigator')
          dispatch(storeUserData(andd[0]))
        } else {
          console.log('Username or password didnt matched');
        }
      } else {
        console.log('useame or passowrd didnt matched')
      }
    }))
  }
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.componyInfo}>
        <Image
          source={require('../../assets/images/logo.png')}
        />
        <View style={styles.cDetails}>
          <Text style={[styles.span, styles.span1]}>Luiva</Text>
          <Text style={[styles.span, styles.span2]}>Care</Text>
        </View>

      </View>

      <View style={styles.TextInputcontainer}>
        <Icon
          name='user'
          color={'#FF7F00'}
          type='entypo'
          style={styles.icon}
        ></Icon>
        <TextInput
          style={styles.TextInput}
          placeholder='name..'
          onChangeText={(name) => setUserName(name)}
        ></TextInput>
      </View>

      <View style={styles.TextInputcontainer}>
        <Icon
          name='key'
          color={'#FF7F00'}
          type='fontisto'
          style={styles.icon}
        ></Icon>
      <TextInput
        style={styles.TextInput}
        placeholder='password..'
        onChangeText={(password) => setPassword(password)}
        // keyboardType='visible-password'
        secureTextEntry
        textContentType='password'
      ></TextInput>
      </View>
      {/* <Button title='login' onPress={handleLogin}></Button> */}
      <AppButton title='login' onPress={handleLogin} />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: '#FDFEFE',
    // justifyContent: 'center',
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    textTransform: 'capitalize',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  TextInputcontainer: {
    borderWidth: 1,
    borderColor: '#f1f1df',
    width: windowWidth,
    flexDirection: 'row',
    justifyContent:'space-evenly',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#FF7F00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextInput: {
    // borderWidth: 1,
    // borderColor: '#f1f1df',
    width: windowWidth - 60 ,
    marginLeft: 10,
    backgroundColor: "#FFFFFF",
    color: '#4c4747',
  },
  componyInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  cDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  span: {
    color: "#FF7F00",
    fontSize: 36,
    letterSpacing: 3,
  },
  span1: {
    fontWeight: 'normal',
  },
  span2: {
    fontWeight: 'bold',
  },

})