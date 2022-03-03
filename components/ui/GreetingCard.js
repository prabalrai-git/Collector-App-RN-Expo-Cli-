import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Text } from 'react-native-elements'

const windowWidth = Dimensions.get('window').width * 0.95;

const GreetingCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.dis}>
        <Text h3 style={styles.title}>Good Moring</Text>
        <Text style={styles.disText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, natus! Sequi.</Text>
      </View>
      <Avatar
        size={64}
        rounded
        source={require('../../assets/images/user.png')}
      />
    </View>
  )
}

export default GreetingCard

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-between',
    backgroundColor: '#fefefe',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  dis:{
    width: windowWidth * 0.65,
  },
  title:{
    color: '#205072',
    marginBottom: 7,
  },
  disText: {
    color: "#2e3133",
    letterSpacing: 2,
  }
})