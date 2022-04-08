
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Pressable, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import StatusBadge from './StatusBadge';
import MapView from 'react-native-maps';
import MarkerCostome from './MarkerCostome';
import { Avatar, Icon } from 'react-native-elements';
import { InfoActionButton } from './HomeActionButton';
import { GetAddressOfClient } from '../../Services/appServices/AssignPatient';



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
  // console.log('data', data);
  const [isVisibe, setisVisibe] = useState(false);
  const user = useSelector(state => state.storeUserData);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [Coordinate, setCoordinate] = useState({
    'latitude': null,
    'longitude': null
  });
  useEffect(() => {
    dispatch(GetAddressOfClient(data.CId, (res) => {
      let temp = JSON.parse(res.clientAddress[0].PatientAddress)
      setCoordinate(temp)
    }))
  }, [])

  const handleProceed = () => {
    navigation.navigate('SelectTest', {
      data: data
    })
    setisVisibe(false)
  }
  const handleRequest = () => {
    navigation.navigate('PrevioiusRequest', { data: data })
    setisVisibe(false)
  }


  const hadleEvent = () => {
    setisVisibe(true)
  }

  const cMarker = {
    latlng: {
      latitude: Coordinate.latitude === null ? 27.7172 : Coordinate.latitude,
      longitude: Coordinate.longitude === null ? 85.3240 : Coordinate.longitude
      // latitude: 27.7172,
      // longitude: 85.3240,
    },
    title: 'title',
    description: 'somethindg'
  }
  return (
    <>
      <Pressable onPress={() => hadleEvent()} style={styles.cardCotainer}>
        <View style={styles.cardBody}>
          <View>
            <Avatar
              size={64}
              rounded
              source={require('../../assets/images/user.png')}
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.ctitle}>{data.PatientFName} {data.PatientLName}</Text>
            <Text style={styles.remarks}>Client Id: {data.CId}</Text>
          </View>
          {/* <BadgeStatus RequestStatus={data.RequestStatus}></BadgeStatus> */}
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
                    <Text >Cliet ID : </Text>
                    <Text style={{ color: "#FF7F00" }}>{data.CId}</Text>
                  </View>
                </View>
              </View>

              {/* <StatusBadge RequestStatus={data.RequestStatus}></StatusBadge> */}

              <View style={styles.container}>
                <View style={styles.patDetail}>
                  <Text style={styles.title}>Patient Name :</Text>
                  <Text style={styles.dis}>{data.PatientFName} {data.PatientMName} {data.PatientLName}</Text>
                </View>
                <View style={styles.patDetail}>
                  <Text style={styles.title}>Age :</Text>
                  <Text style={styles.dis}>{data.PatientAge}</Text>
                </View>
                <View style={styles.patDetail}>
                  <Text style={styles.title}>Gender :</Text>
                  <Text style={styles.dis}>{data.PatientGender}</Text>
                </View>
                <View style={styles.patDetail}>
                  <Text style={styles.title}>E-mail :</Text>
                  <Text style={styles.dis}>{data.PatientEmailId}</Text>
                </View>

              </View>
              <Text style={styles.title}>Adddress :</Text>
              <View style={styles.mapViewContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: Coordinate.latitude === null ? 27.7172 : Coordinate.latitude,
                    longitude: Coordinate.longitude === null ? 85.3240 : Coordinate.longitude,
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

              <View style={styles.module}>
                <Pressable onPress={() => handleRequest()}>
                  <InfoActionButton icon={'book'} name={'Previous Request'}></InfoActionButton>
                </Pressable>
                <Pressable onPress={() => handleProceed()}>
                  <InfoActionButton icon={'addfile'} name={'Book Test'} ></InfoActionButton>
                </Pressable>
              </View>

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
    borderRadius: 12,
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
    width: windowWidth * 0.65,
  },
  ctitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flex: 0.45,
    // backgroundColor: 'red',
    borderRadius: 18,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: "#629fa1cc",
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
  title: {
    fontSize: 16,
    color: '#205072',
    fontWeight: 'bold',
    letterSpacing: 1.3,
    // marginBottom: 10
  },
  container: {
    width: windowWidth - 20,
    // backgroundColor: 'red'
  },
  patDetail: {
    width: windowWidth - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  dis: {
    width: windowWidth * 0.5,
    fontSize: 14,
    letterSpacing: 1,
  }

})