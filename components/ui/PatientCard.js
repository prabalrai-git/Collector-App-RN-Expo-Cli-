import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const PatientCard = ({data}) => {
  // console.log(data.CId);
  const navigation = useNavigation()
  return (
    <View style={styles.mainContainer}>
    <TouchableOpacity onPress={()=> navigation.navigate('BookTest', {
      screen: 'SelectTest',
      params: { data: data}
    })}>
      <View style={styles.cardContainer}>
        <Avatar
          size={64}
          rounded
          source={require('../../assets/images/user.png')}
        />
        <View style={styles.dis}>
          <Text style={styles.title}>{data.PatientFName} {data.PatientMName} {data.PatientLName}</Text>
          <Text style={styles.disText}>Cid: 1231</Text>
        </View>
        <Text style={styles.testBook}>Bookded</Text>
      </View>
    </TouchableOpacity>
    </View>
  )
}

export default PatientCard

const styles = StyleSheet.create({
  mainContainer: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cardContainer: {
    flexDirection: 'row',
    width: windowWidth * 0.95,
    backgroundColor: '#fefefe',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent:'space-between',
    margin: 5,
  },
  dis: {
    // marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 3,
    color: "#205072",
    width: windowWidth * 0.5,

  },
  testBook: {
    backgroundColor: "#9DD4E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    color: "#fefefe"
  }
})