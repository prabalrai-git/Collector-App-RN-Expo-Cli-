import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
import { GlobalStyles } from '../../GlobalStyle';

const windowWidth = Dimensions.get('window').width;


export const HomeActionButton = ({ data }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={[styles.btnContainer,{
          backgroundColor: data.color
        }]}
        onPress={() => navigation.navigate(`${data.pathName}`)}
      >
        <Icon
          name={data.icon}
          color={'#fefefe'}
          type={data.type}
          style={styles.icon}
          size={30}
        ></Icon>
        {/* <AddPatient></AddPatient> */}
        <Text style={[GlobalStyles.btnTxt, {color: '#fefefe', marginTop: 10}]}>{data.name}</Text>
      </TouchableOpacity>
    </>


  )
}


export const InfoActionButton = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={styles.btnContainer2}
    >
      <Icon
        name={props.icon}
        color={secondary}
        type={props.type}
        style={styles.icon}
        size={30}
      ></Icon>
      <Text style={[GlobalStyles.btnTxt, {color: primary, marginTop: 10}]}>{props.name}</Text>
    </View>

  )
}


const styles = StyleSheet.create({
  btnContainer: {
    width: windowWidth * 0.45,
    height: 110,
    margin: 9,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    shadowColor: "#88d4ce",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  btnContainer2: {
    width: windowWidth * 0.45,
    height: 100,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    shadowColor: "#60b6af",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  // txt: {
  //   marginTop: 10,
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   letterSpacing: 1,
  //   color: '#fefefe'
  // }

})