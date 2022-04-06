
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Pressable, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppButton from './AppButton';
import CancleBtn from './CancleBtn';
import { useDispatch, useSelector } from 'react-redux';
import StatusBadge from './StatusBadge';
import MapView from 'react-native-maps';
import MarkerCostome from './MarkerCostome';
import { Icon } from 'react-native-elements';
import BadgeStatus from './BadgeStatus';
import { dummyData } from '../../dumyData';



const windowWidth = Dimensions.get('window').width

// "SrId": 1,
//  "RequestId": 2,
//  "RequestStatusId": 3,
//  "EntryDate": "2022-03-22T10:57:37.8717928+05:45",
//  "UserId": 5,
//  "Remarks": "sample string 6"


// "CollectedDate": "2022-04-03T17:15:03",
// "CollectionCharge": 500,
// "CollectionReqDate": "2022-04-16T17:13:44",
// "CollectorId": 3,
// "DiscountAmount": 100,
// "GrandTotal": 6215,
// "IsPaid": true,
// "PatId": 66,
// "PatientAge": "26",
// "PatientFName": "Ram",
// "PatientGender": "male",
// "PatientLName": "Yadav",
// "PatientMName": "",
// "RId": 44,
// "Remarks": "Sik free",
// "RequestStatus": "Requested",
// "TestTotalAmount": 5815,


const PatientInfoCard = ({ data, AsignedTask }) => {
  console.log('data', data);
  const [isVisibe, setisVisibe] = useState(false);
  const user = useSelector(state => state.storeUserData);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [TestList, setTestList] = useState();
  const listData = dummyData.RequestList;
  useEffect(() => {
    // dispatch(GetHomeCollectionTestRequestTestList(data.RId, (res) => {
    //   setTestList(res?.RequestTestList);
    // }))
  }, [])


  const hadleEvent = () => {
    setisVisibe(true)
  }

  const cMarker = {
    latlng: {
      // latitude: tempCoordinate.latitude === null ? 27.7172 : tempCoordinate.latitude,
      // longitude: tempCoordinate.longitude === null ? 85.3240 : tempCoordinate.longitude
      latitude: 27.7172,
      longitude: 85.3240,
    },
    title: 'title',
    description: 'somethindg'
  }
  return (
    <>

      <Pressable onPress={() => hadleEvent()} style={styles.cardCotainer}>
        <View style={styles.cardBody}>
          <View style={styles.card}>
            <Text style={styles.ctitle}>{data.PatientFName} {data.PatientLName}</Text>
            <Text style={styles.remarks}>Request Id: {data.RId}</Text>
            <Text style={styles.cDate}>{data.CollectionReqDate}</Text>
          </View>
          <BadgeStatus RequestStatus={data.RequestStatus}></BadgeStatus>
        </View>
      </Pressable>
      {
        AsignedTask &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibe}
          onRequestClose={() => {
            setisVisibe(!isVisibe)
            // setisRemarksVisible(false)
          }}
        >

          <View style={styles.centeredView}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#8ED1FC',
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setisVisibe(false)
                // setisRemarksVisible(false)
              }}>
              <Icon
                name={'close'}
                color={'#fefefe'}
                type='antdesign'
                size={20}
              ></Icon>
            </TouchableOpacity>

            <View style={styles.patInfocontainer}>
              <View style={styles.profile}>
                <Image
                  source={require('../../assets/images/user.png')}
                  style={styles.profileImg}
                ></Image>
                <View style={styles.right}>
                  <Text style={styles.name}>{data.PatientFName} {data.PatientMName} {data.PatientLName}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text >Age :</Text>
                    <Text style={{ color: "#FF7F00" }}> {data.PatientAge}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text >Cliet ID : </Text>
                    <Text style={{ color: "#FF7F00" }}>{data.CId}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text >Gender : </Text>
                    <Text style={{ color: "#FF7F00" }}>{data.PatientGender}</Text>
                  </View>
                </View>

              </View>

              <StatusBadge RequestStatus={data.RequestStatus}></StatusBadge>


              <View style={styles.mapViewContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 27.7172,
                    longitude: 85.3240,
                    latitudeDelta: 0.0111922,
                    longitudeDelta: 0.0111421,
                  }}
                >
                  <MarkerCostome
                    coordinate={cMarker.latlng}
                    title={cMarker.title}
                    description={cMarker.description}
                    forClient
                  />
                </MapView>
              </View>

              <View style={styles.flatListContainer}>
                <Text style={styles.title}>Recent Tests</Text>
                <FlatList
                  data={listData}
                  renderItem={({ item, index }) =>
                    <View style={styles.testCard}>
                      <View>
                        <Text style={styles.testsText}>{item.RId}</Text>
                        <Text style={styles.testsPrice}>{item.CollectedDate}</Text>
                      </View>
                      <BadgeStatus RequestStatus={item.RequestStatus}></BadgeStatus>
                    </View>
                  }
                  keyExtractor={item => item.SId}
                />
              </View>

              {/* <View style={styles.module}>

                  <CancleBtn title='Reject' color={'#e0c945'} onPress={() => setisRemarksVisible(true)}></CancleBtn>
                  <Text>   </Text>
                  <AppButton title='Accept' onPress={() => handleAccept()}></AppButton>
                </View> */}

            </View>


          </View>
        </Modal>
      }



    </>
  )
}

export default PatientInfoCard

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  ctitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#205072",
    marginBottom: 5,
  },
  remarks: {
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
    width: '100%',
    flex: 1,
    backgroundColor: '#fefefe'
  },
  textInput: {
    width: "100%",
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  module: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    flex: 0.3,
    // backgroundColor: 'red',
    borderRadius: 18,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: "#67e8ec",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  map: {
    width: '100%',
    flex: 1,
  },
  flatListContainer: {
    width: windowWidth - 20,
    marginRight: 10,
    // flex: 0.55,
    height: 200,
    flexDirection: 'column',
    // backgroundColor: 'yellow'
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
    marginVertical: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    // width: '100%',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#8ED1FC',
    shadowColor: "#67e8ec",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  testsText: {
    color: "#232325",
    fontSize: 14,
    letterSpacing: 1.2,
    // marginLeft: 20,
    // width: windowWidth * 0.6
  },
  testsPrice: {
    // width: windowWidth * 0.4,
    color: '#FF7F00'
  },

})