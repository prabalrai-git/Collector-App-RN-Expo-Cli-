import { Button, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AppButton from '../../components/ui/AppButton'
//   CId: 1
// CollectionReqDate: "2022-03-07T12:10:57.52"
// CollectorId: 2
// EnterBy: 15
// EntryDate: "2022-03-07T12:10:57.52"
// PatientAddress: "sample string 9"
// PatientAge: "sample str"
// PatientEmailId: "sample string 8"
// PatientFName: "sample string 3"
// PatientGender: "sample str"
// PatientLName: "sample string 5"
// PatientMName: "sample string 4"
// PatientNationalId: "sample string 12"
// PatientReferedBy: 10
// PatientRequestorBy: 11
// Remarks: "sample string 13"

const windowWidth = Dimensions.get('window').width * 1;

const data = [
  {
    id: 1,
    title: 'Complete Blood Count',
    price: 850,
  },
  {
    id: 2,
    title: 'Hemogran',
    price: 450,
  },
  {
    id: 3,
    title: 'Renal Functionn Text',
    price: 750,
  },
  {
    id: 4,
    title: 'Liver function Test',
    price: 1050,
  },
  {
    id: 5,
    title: 'Complete Blood Count',
    price: 850,
  },
  {
    id: 6,
    title: 'Collagen Disease / Arthrities Panel',
    price: 850,
  },
  {
    id: 7,
    title: 'Anaemia Pael',
    price: 850,
  },
  {
    id: 8,
    title: 'Fertility Profile Female',
    price: 850,
  },
  {
    id: 9,
    title: 'Complete Blood Count 2',
    price: 850,
  },
];


const TaskInfoScreen = ({ route }) => {
  const navigation = useNavigation();
  console.log(route.params.data)
  const text = route.params.data.CollectionReqDate;
  const temp = text.split('T');
  console.log(temp);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profile}>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.profileImg}
        ></Image>
        <View style={styles.right}>
          <Text style={styles.name}>{route.params.data.PatientFName} {route.params.data.PatientMName} {route.params.data.PatientLName}</Text>
          <Text>Client ID : {route.params.data.CId}</Text>
          <Text>Collection Date : {temp[0]}</Text>
          <Text>Collection Time : {temp[1]}</Text>
        </View>

      </View>
      <View style={styles.testList}>
        <Text style={styles.title}>Tests</Text>
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <View style={styles.testCard}>
              <Text style={styles.testsText}>{item.title}</Text>
            </View>
          }
          keyExtractor={item => item.id}
        />
        <View style={styles.container}>
          <Button title='Cancel' color={'#e0c945'}></Button>
          <AppButton title='Accept' onPress={() => navigation.navigate('MapScreen',
            {
              data: route.params.data
            }
          )}></AppButton>
        </View>
      </View>


    </View>
  )
}

export default TaskInfoScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    // padding: 10,
    backgroundColor: '#fefefe'
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
    color: '#205072',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 10
  },
  testList: {
    backgroundColor: '#9DD4E9',
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  title: {
    fontSize: 26,
    color: '#205072',
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 10
  },
  testCard: {
    borderWidth: 1,
    borderColor: "#fefefe",
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  testsText: {
    color: "#fefefe",
    fontSize: 16,
    letterSpacing: 1.2,

  }
})