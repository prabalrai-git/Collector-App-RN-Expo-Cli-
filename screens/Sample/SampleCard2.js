import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const SampleCard = ({ item }) => {
  // console.log(item.RequestStatus === Requested);
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PatietInfoScreen', { data: item })}>
      <View style={styles.cardContainer}>
        <Avatar
          size={64}
          rounded
          source={require('../../assets/images/user.png')}
        />
        <View style={styles.dis}>
          <Text style={styles.title}>{item.PatientFName} {item.PatientMName} {item.PatientLName}</Text>
          <Text style={styles.disText}>RId: {item.RId}</Text>
        </View>
        <View>
          {
            item.RequestStatus === 'Collected' ?
              <Text style={{
                backgroundColor: 'green',
                color: '#fefefe',
                padding: 3,
                borderRadius: 20,
                fontSize: 10,
              }}>collected</Text>
              : <Text
                style={{
                  backgroundColor: 'yellow',
                  color: '#fefefe',
                  padding: 3,
                  borderRadius: 20,
                  fontSize: 10,
                }}
              >pending</Text>
          }

        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SampleCard

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: windowWidth - 30,
    backgroundColor: '#fefefe',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 15,

  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 3,
    color: "#205072",
    width: windowWidth * 0.5,
  },
})