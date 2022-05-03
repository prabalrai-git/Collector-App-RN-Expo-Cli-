import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GetSampleRequestDetailsByRId } from '../../Services/appServices/Notificationservice';
import { Icon } from 'react-native-elements';
import AppButton from '../../components/ui/AppButton';
import StatusBadge from '../../components/ui/StatusBadge';
import MapView from 'react-native-maps';
import MarkerCostome from '../../components/ui/MarkerCostome';
import { GlobalStyles } from '../../GlobalStyle';
import CancleBtn from '../../components/ui/CancleBtn';
import Header from '../../components/Header';
import { GetHomeCollectionTestRequestTestList } from '../../Services/appServices/AssignPatient';
import { useIsFocused } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width
const NotificationHomeScreen = ({ route }) => {
  // console.log("route", route.params.data.NotficationPathName);
  const dispatch = useDispatch();
  const [UserData, setUserData] = useState();
  const [isRemarksVisible, setisRemarksVisible] = useState(false);
  const [Remarks, setRemarks] = useState('');
  const [TestList, setTestList] = useState()
  const [Coordinate, setCoordinate] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused()

  useEffect(() => {
    setIsLoading(true)
    setUserData()
    setCoordinate()
    setTestList();

    setTimeout(() => {
      dispatch(GetSampleRequestDetailsByRId(route.params.data.NotficationPathName, (res) => {
        // console.log('res', res.RequestDetails[0]);
        setUserData(res.RequestDetails[0])
        setCoordinate(JSON.parse(res.RequestDetails[0].PatientAddress))
      }))
      dispatch(GetHomeCollectionTestRequestTestList(route.params.data.NotficationPathName, (res) => {
        setTestList(res?.RequestTestList);
      }))

      setIsLoading(false)
    }, 0)
  }, [isFocused])

  // console.log(isFocused);


  // useEffect(() => {
  //   setIsLoading(true);
  // }, [isFocused])
  // "CId": 58,
  // "CollectionReqDate": "2022-04-28T15:53:09",
  // "CollectorId": 3,
  // "EnterBy": 1,
  // "EntryDate": "2022-04-28T15:53:21",
  // "IsPaid": true,
  // "PatientAddress": "{\"latitude\":27.7242209978614,\"longitude\":85.32790621742606}",
  // "PatientAge": "25",
  // "PatientEmailId": "",
  // "PatientFName": "Admin",
  // "PatientGender": "male",
  // "PatientLName": "Suman",
  // "PatientMName": "",
  // "PatientReferedBy": 1,
  // "PatientRequestorBy": 1,
  // "PaymentType": "1",
  // "Remarks": null,
  // "RequestId": 94,
  // "RequestStatus": 1,
  // "SampleStatus": "Requested",

  return (

    <KeyboardAvoidingView style={styles.centeredView}>
      <Header title={`Notification, RId: ${route.params.data.NotficationPathName}`}></Header>
      {
        isLoading ?
          <Text>is loading</Text>
          :
          <>
            {
              UserData !== undefined &&
              <ScrollView>
                {
                  isRemarksVisible ?

                    <View style={styles.textInput}>
                      <Text style={styles.formLabel}>Please write remarks on why you want to decline</Text>
                      <TextInput
                        value={Remarks}
                        placeholder='Remarks'
                        onChangeText={(e) => setRemarks(e)}
                        style={styles.inputField}
                        multiline={true}

                      ></TextInput>
                      {/* <TextInput></TextInput> */}

                      <AppButton title='Send' onPress={() => handleReject()}></AppButton>
                    </View>
                    :
                    <View style={styles.patInfocontainer}>
                      <View style={styles.profile}>
                        <Image
                          source={require('../../assets/images/user.png')}
                          style={styles.profileImg}
                        ></Image>
                        <View style={styles.right}>
                          <Text style={styles.name}>{UserData.PatientFName} {UserData.PatientMName} {UserData.PatientLName}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text >Request ID :</Text>
                            <Text style={{ color: "#FF7F00" }}> {UserData.RequestId}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text >Cliet ID : </Text>
                            <Text style={{ color: "#FF7F00" }}>{UserData.PatId}</Text>
                          </View>
                          {/* <View style={{ flexDirection: 'row' }}>
                  <Text >Collection Date : </Text>
                  <Text style={{ color: "#FF7F00" }}>{temp[0]}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text >Collection Time : </Text>
                  <Text style={{ color: "#FF7F00" }}>{temp[1]}</Text>
                </View> */}
                        </View>

                      </View>

                      <StatusBadge RequestStatus={UserData.SampleStatus} IsPaid={UserData.IsPaid}></StatusBadge>


                      <View style={[styles.mapViewContainer, GlobalStyles.boxShadow]}>
                        <MapView
                          style={styles.map}
                          initialRegion={{
                            latitude: Coordinate?.latitude,
                            longitude: Coordinate?.longitude,
                            latitudeDelta: 0.00511922,
                            longitudeDelta: 0.00511421,
                          }}
                        >
                          <MarkerCostome
                            coordinate={Coordinate}
                            title={'title'}
                            description={'dis'}
                            forClient
                          />
                        </MapView>
                      </View>

                      <View style={[styles.cardContainer, GlobalStyles.boxShadow]}>
                        <Text style={styles.title}>Tests</Text>
                        {
                          TestList !== undefined ?
                            TestList.map((e) => (
                              <View style={styles.testCard} key={e.SId}>
                                <Text style={styles.testsText}>{e.TestName}</Text>
                                <Text style={styles.testsPrice}>Rs.{e.TestPrice}</Text>
                              </View>
                            )) : null
                        }
                      </View>

                      {/* <View style={[styles.module, GlobalStyles.boxShadow]}>
                        <Text style={{
                          color: '#fefefe',
                          fontSize: 16,
                          marginBottom: 10,
                          fontWeight: 'bold',
                          letterSpacing: 1,
                        }}>Do you want to Accept or rect the task ?</Text>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                          <CancleBtn title='Reject' color={'#e0c945'} onPress={() =>
                            setisRemarksVisible(true)
                          }></CancleBtn>
                          <Text>   </Text>
                          <AppButton title='Accept' onPress={() => handleAccept()}></AppButton>
                        </View>

                      </View> */}

                    </View>

                }
              </ScrollView>
            }
          </>

      }
    </KeyboardAvoidingView>
  )
}

export default NotificationHomeScreen

const styles = StyleSheet.create({
  cardCotainer: {
    width: windowWidth,
    paddingHorizontal: 10,
  },

  cardBody: {
    backgroundColor: "#fefefe",
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#205072',
    shadowColor: "#101010",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ctitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#205072",
    marginBottom: 5,
  },
  subheading: {
    color: "#253539",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 5,
  },
  cDate: {
    color: "#fefefe",
    fontSize: 10,
    letterSpacing: 2,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: "#ff7f00",
    borderRadius: 10,
    width: 'auto'
  },
  centeredView: {
    // width: '100%',
    flex: 1,
    backgroundColor: '#f9f9f9'

  },
  textInput: {
    width: "100%",
    // flex: 1,
    marginLeft: 10,
    marginTop: 80,
    // justifyContent: 'center',
  },
  module: {
    width: '100%',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#9DD4E9',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 18,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'red',
    width: windowWidth - 20,
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 10,
  },

  patInfocontainer: {
    width: windowWidth - 20,
    flex: 1,
    marginLeft: 10,
  },

  profile: {
    flexDirection: 'row',
    paddingVertical: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 6
  },
  mapViewContainer: {
    width: '100%',
    height: 230,
    // backgroundColor: 'red',
    borderRadius: 18,
    marginVertical: 10,
    overflow: 'hidden'
  },
  map: {
    width: '100%',
    flex: 1,
  },
  // flatListContainer: {
  //   width: windowWidth - 20,
  //   marginHorizontal: 10,
  //   flex: 0.55,
  // },
  title: {
    fontSize: 20,
    color: '#205072',
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 10
  },
  testCard: {
    flexDirection: 'row',
    marginVertical: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  testsText: {
    color: "#232325",
    fontSize: 14,
    letterSpacing: 1.2,
    // marginLeft: 20,
    width: windowWidth * 0.7
  },
  testsPrice: {
    width: windowWidth * 0.3,
    color: '#FF7F00'
  },
  remarks: {
    // borderWidth: 1,
    // borderColor: '#76968a',
    // borderRadius: 5,
    marginTop: 6,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  remarksDis: {
    fontSize: 12,
    color: "#205072",
    letterSpacing: 1,
    textAlign: 'justify'
  },
  cardContainer: {
    // borderWidth: 1,
    borderRadius: 18,
    backgroundColor: '#fefefe',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  testList: {
    backgroundColor: '#9DD4E9',
    marginLeft: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    width: windowWidth - 20,
  },
})