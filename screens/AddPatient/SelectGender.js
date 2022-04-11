import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';

const SelectGender = () => {
  // const [gender, setgender] = useState(true);

  return (
    <View >
      <Text>Select your Gender ?</Text>


      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }}>
        <Pressable style={[styles.button, styles.male]}>
          <Icon
            name={'male'}
            color={'#fefefe'}
            type='fontisto'
            style={styles.icon}
            size={40}
          ></Icon>
          <Text style={styles.text}>male</Text>

        </Pressable>
        <Pressable style={[styles.button, styles.female]}>
          <Icon
            name={'female'}
            color={'#fefefe'}
            type='fontisto'
            style={styles.icon}
            size={40}
          ></Icon>
          <Text style={styles.text}>Female</Text>
        </Pressable>
      </View>

      {/* #49A3D8 */}
      {/* E866A9 */}

    </View>
  )
}

export default SelectGender

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
    backgroundColor: '#FF7F00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  male: {
    backgroundColor: '#49A3D8',
    shadowColor: "#49A3D8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  female: {
    backgroundColor: '#E866A9',
    shadowColor: "#E866A9",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  text: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 10,
  }
})