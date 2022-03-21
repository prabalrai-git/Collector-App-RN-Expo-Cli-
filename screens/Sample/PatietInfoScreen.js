import { Button, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AppButton from '../../components/ui/AppButton'
import { useDispatch } from 'react-redux';
import { GetHomeCollectionTestRequestTestList } from '../../Services/appServices/AssignPatient';
// "RId": 10,
// "PatId": 12,
// "CollectorId": 3,
// "PatientFName": "Anib",
// "PatientMName": "undefined",
// "PatientLName": "Maharjan",
// "PatientAge": "25",
// "PatientGender": "male",
// "CollectionReqDate": "2022-03-27T02:00:33",
// "TestTotalAmount": 12500,
// "CollectionCharge": 500,
// "DiscountAmount": 200,
// "GrandTotal": 12800,
// "Remarks": "Special discount ",
// "CollectedDate": "2022-03-21T12:28:10"

const windowWidth = Dimensions.get('window').width;


const PatietInfoScreen = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [TestList, setTestList] = useState();
  console.log(route.params.data)
  const text = route.params.data.CollectionReqDate;
  const temp = text.split('T');

  useEffect(() => {
    dispatch(GetHomeCollectionTestRequestTestList(route.params.data.RId, (res) => {
      setTestList(res?.RequestTestList);
    }))
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profile}>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.profileImg}
        ></Image>
        <View style={styles.right}>
          <Text style={styles.name}>{route.params.data.PatientFName} {route.params.data.PatientMName} {route.params.data.PatientLName}</Text>
          <Text>Client ID : {route.params.data.RId}</Text>
          <Text>Collection Date : {temp[0]}</Text>
          <Text>Collection Time : {temp[1]}</Text>
        </View>

      </View>
      <View style={styles.testList}>
        <Text style={styles.title}>Tests</Text>
        <FlatList
          data={TestList}
          renderItem={({ item, index }) =>
            <View style={styles.testCard}>
              <Text style={{
                fontSize: 16,
                color: '#fefefe',
                width: 25,
                height: 25,
                textAlign: 'center',
                borderRadius: 50,
                backgroundColor: '#205072',
              }}>{index + 1}</Text>
              <Text style={styles.testsText}>{item.TestName}</Text>
            </View>
          }
          keyExtractor={item => item.SId}
        />
        <View style={styles.container}>
          <Button title='Cancle' color={'#e0c945'}></Button>
          <AppButton title='location' onPress={() => navigation.navigate('MapScreen',
            {
              data: route.params.data
            }
          )}></AppButton>
        </View>
      </View>


    </View>
  )
}

export default PatietInfoScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 40,
    backgroundColor: '#9DD4E9'
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  container: {
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between'
  },
  profile: {
    // flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  right: {
    marginLeft: 20,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  name: {
    width: windowWidth * 0.5,
    color: '#205072',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 10
  },
  testList: {
    backgroundColor: '#fefefe',
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#205072',
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 10
  },
  testCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    paddingHorizontal: 5,
    // paddingVertical: 4,
    borderRadius: 5,
    width: windowWidth * 0.8
  },
  testsText: {
    color: "#232325",
    fontSize: 14,
    letterSpacing: 1.2,

  }
})