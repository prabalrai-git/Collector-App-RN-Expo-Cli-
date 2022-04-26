import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;


export const HomeActionButton = ({ data }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => navigation.navigate(`${data.pathName}`)}
      >
        <Icon
          name={data.icon}
          color={'#FF7F00'}
          type={data.type}
          style={styles.icon}
          size={30}
        ></Icon>
        {/* <AddPatient></AddPatient> */}
        <Text style={styles.txt}>{data.name}</Text>
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
        color={'#FF7F00'}
        type={props.type}
        style={styles.icon}
        size={30}
      ></Icon>
      <Text style={styles.txt}>{props.name}</Text>
    </View>

  )
}


const styles = StyleSheet.create({
  btnContainer: {
    width: windowWidth * 0.45,
    height: 100,
    margin: 9,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    shadowColor: "#7ac2bc",
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
  txt: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#205072'
  }

})