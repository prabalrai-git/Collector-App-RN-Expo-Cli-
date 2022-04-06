import { Alert, Button, Dimensions, FlatList, Image, ImageBackground, Modal, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AppButton from '../../components/ui/AppButton'
import { useDispatch } from 'react-redux';
import { GetHomeCollectionTestRequestTestList, GetStatus, UpdateStatus } from '../../Services/appServices/AssignPatient';
import Signature from "react-native-signature-canvas";
import StatusBadge from '../../components/ui/StatusBadge';
import HamMenu from '../../components/ui/HamMenu';
import BackBtn from '../../components/ui/BackBtn';
import Header from '../../components/Header';
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
const windowHeight = Dimensions.get('window').height;

const style = `.m-signature-pad--footer
.button {
  background-color: green;
  color: #FFF;
}`;

const PatietInfoScreen = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [TestList, setTestList] = useState();
  console.log("status", route.params.data)
  const text = route.params.data.CollectionReqDate;
  const temp = text.split('T');
  const [CollectedStatus, setCollectedStatus] = useState();
  const [Remarks, setRemarks] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [signature, setSign] = useState(null);
  const [btnDis, setbtnDis] = useState(false);
  const [isPaid, setisPaid] = useState(route.params.data.IsPaid);
  // const [switchDis, setSwitchDis] = useState(isPaid);
  const toggleSwitch = () => setisPaid(previousState => !previousState);

  useEffect(() => {
    dispatch(GetHomeCollectionTestRequestTestList(route.params.data.RId, (res) => {
      setTestList(res?.RequestTestList);
    }))
    dispatch(GetStatus((res) => {
      setCollectedStatus(res.sampleStatus[4]);
    }))
  }, [])

  // {
  //   "SrId": 1,
  //   "RequestId": 2,
  //   "RequestStatusId": 3,
  //   "EntryDate": "2022-03-22T10:57:37.8717928+05:45",
  //   "UserId": 5,
  //   "Remarks": "sample string 6"
  // }

  const handleSubmit = (signature) => {

    let today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const newTime = today.toLocaleTimeString();
    const fianlEntryDate = newDate + 'T' + newTime;
    setSign(signature)

    const data = {
      "SrId": 0,
      "RequestId": route.params.data.RId,
      "RequestStatusId": CollectedStatus?.StId,
      "EntryDate": fianlEntryDate,
      "UserId": route.params.data.CollectorId,
      "Remarks": Remarks !== '' ? Remarks : '',
      // "signature": signature
    }
    // console.log(data);

    dispatch(UpdateStatus(data, (res) => {
      if (res?.SuccessMsg === true) {
        // console.log('data saved suucess');
        Alert.alert(
          'Sucess',
          'sample Collected sucessful',
          [
            {
              text: 'ok',
              onPress: () => navigation.navigate('SampleHomeScreen')
            }
          ]
        )
      } else {
        Alert.alert(
          'Failed',
          'sample not collected',
          [
            {
              text: 'ok',
              onPress: () => setIsVisible(false)
            }
          ]
        )
      }
    }))

  }
  const handleEmpty = () => {
    // console.log("Empty");
    setSign(null)
  };
  const hadleProceed = () => {
    setIsVisible(!isVisible);
    setbtnDis(!btnDis)
  }

  return (
    <View style={styles.mainContainer}>
      {/* <ImageBackground
        source={require('../../assets/images/bkg1.png')}
        resizeMode="cover"
        style={styles.bkgImg}
      > */}
        {/* <HamMenu></HamMenu>
        <BackBtn></BackBtn> */}
        <Header title={'Patient Info'}></Header>
        <View style={styles.container}>
          <View style={styles.profile}>
            <Image
              source={require('../../assets/images/user.png')}
              style={styles.profileImg}
            ></Image>
            <View style={styles.right}>
              <Text style={styles.name}>{route.params.data.PatientFName} {route.params.data.PatientMName} {route.params.data.PatientLName}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text >Request ID :</Text>
                <Text style={{ color: "#FF7F00" }}> {route.params.data.RId}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text >Cliet ID : </Text>
                <Text style={{ color: "#FF7F00" }}>{route.params.data.PatId}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text >Collection Date : </Text>
                <Text style={{ color: "#FF7F00" }}>{temp[0]}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text >Collection Time : </Text>
                <Text style={{ color: "#FF7F00" }}>{temp[1]}</Text>
              </View>



            </View>

          </View>
          <View style={styles.statusCotnainer}>
            <StatusBadge RequestStatus={route.params.data.RequestStatus}></StatusBadge>
          </View>
          <View style={styles.flatListContainer}>
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
                  <Text style={styles.testsPrice}>Rs.{item.TestPrice}</Text>
                </View>
              }
              keyExtractor={item => item.SId}
            />
            <View style={styles.testCard}>
              <Text style={styles.titleText}>Total</Text>
              <Text style={styles.finsltestsPrice}>Rs.{route.params.data.TestTotalAmount}</Text>
            </View>
            <View style={styles.testCard}>
              <Text style={styles.titleText}>Collection Charge</Text>
              <Text style={styles.finsltestsPrice}>Rs.{route.params.data.CollectionCharge}</Text>
            </View>
            <View style={styles.testCard}>
              <Text style={styles.titleText}>Discount Amout</Text>
              <Text style={styles.finsltestsPrice}>Rs.{route.params.data.DiscountAmount}</Text>
            </View>
            <View style={styles.testCard}>
              <Text style={styles.titleText}>Grand Total</Text>
              <Text style={styles.finsltestsPrice}>Rs.{route.params.data.GrandTotal}</Text>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
              setbtnDis(!btnDis)
              setSign(null);
              setIsVisible(!isVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modelCotainer}>
                <View style={styles.preview}>
                  {signature ? (
                    <Image
                      resizeMode={"contain"}
                      style={{ width: 335, height: 114 }}
                      source={{ uri: signature }}
                    />
                  ) : null}
                </View>
                <Signature
                  onOK={handleSubmit}
                  onEmpty={handleEmpty}
                  descriptionText="Sign"
                  clearText="Clear"
                  confirmText="Save"
                  webStyle={style}
                  style={styles.previewText}
                />
                <View
                  style={styles.bSheet}
                >
                  <AppButton title='cancle' onPress={() => {
                    setSign(null)
                    setIsVisible(false)
                    setbtnDis(!btnDis)
                  }} color={'#ffc107'} buttonStyle={{ backgroundColor: 'yellow' }} />
                </View>
              </View>
            </View>
          </Modal>
         
        </View>
      {/* </ImageBackground> */}
      {
            route.params.data.RequestStatus === 'Requested' ?
              <View style={styles.testList}>
                <View style={styles.TextInput}>
                  <Text style={styles.formLabel}>IsPaid</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isPaid ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isPaid}
                    disabled={isPaid}
                  />
                </View>
                <View style={styles.TextInput}>
                  <TextInput
                    value={Remarks}
                    placeholder='remarks'
                    onChangeText={(e) => setRemarks(e)}
                    style={styles.inputField}
                    multiline={true}
                  ></TextInput>
                </View>
                <AppButton title='proceed' onPress={() => hadleProceed()} disable={btnDis}></AppButton>
                {/* <Button disabled></Button> */}
              </View>
              : null
          }
    </View>
  )
}

export default PatietInfoScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingTop: 40,
    // backgroundColor: '#9DD4E9'
    backgroundColor: '#fefefe',
    position: 'relative'
  },
  // bkgImg: {
  //   width: Dimensions.get('window').width * 1,
  //   height: Dimensions.get('window').height * 1.2,

  //   // flex: 1
  // },
  container: {
    // paddingTop: 90,
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 6
  },
  testList: {
    // backgroundColor: '#fefefe',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#9DD4E9',
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

  },
  title: {
    fontSize: 20,
    color: '#205072',
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 10
  },
  flatListContainer: {
    width: windowWidth - 20,
    marginHorizontal: 10,
    height: 350
  },
  testCard: {
    flexDirection: 'row',
    marginVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: windowWidth,

  },
  testsText: {
    color: "#232325",
    fontSize: 14,
    letterSpacing: 1.2,
    marginLeft: 20,
    width: windowWidth * 0.6
  },
  testsPrice: {
    width: windowWidth * 0.4,
    color: '#FF7F00'
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#fefefe',
    width: windowWidth * 0.92,
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,

  },
  centeredView: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelCotainer: {
    height: windowHeight,
    width: windowWidth,
  },
  preview: {
    width: '100%',
    height: 400,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  previewText: {
    flex: 1,
    overflow: 'hidden',
    width: '100%'
  },
  statusCotnainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  TextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    width: windowWidth * 0.6,
  },
  finsltestsPrice: {
    borderWidth: 1,
    borderColor: '#efed11',
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 3,
  }

})