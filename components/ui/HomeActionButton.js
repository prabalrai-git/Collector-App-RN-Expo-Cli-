import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;


export const HomeActionButton = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => navigation.navigate(`${data.pathName}`)}
    >
      <Icon
        name={data.icon}
        color={'#FF7F00'}
        type='antdesign'
        style={styles.icon}
        size={30}
      ></Icon>
      <Text style={styles.txt}>{data.name}</Text>
    </TouchableOpacity>

  )
}


export const InfoActionButton = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={styles.btnContainer}
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
    width: windowWidth * 0.42,
    height: 100,
    // borderWidth: 1,
    // borderColor: '#232323',
    margin: 10,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    shadowColor: "#7e9694",
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