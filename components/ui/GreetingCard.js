import { Text, Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar} from 'react-native-elements'
import { GlobalStyles } from '../../GlobalStyle';

const windowWidth = Dimensions.get('window').width * 0.95;

const GreetingCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.dis}>
        <Text style={[GlobalStyles.header, {color: '#fefefe'}]}>Welcome Back !</Text>
        <Text style={[GlobalStyles.body, {color: '#205072'}]}>Your target for today is to keep positive mindset and smile to everyone you meet.</Text>
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
    backgroundColor: global.secodaryCardColor,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  dis:{
    width: windowWidth * 0.65,
  },
})