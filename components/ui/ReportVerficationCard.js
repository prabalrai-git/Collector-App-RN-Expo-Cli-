import { Alert, Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GlobalStyles } from '../../GlobalStyle'
import BadgeStatus from './BadgeStatus'
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { GetTestListToViewOrVerifyInSummaryReportS } from '../../Services/appServices/ReportVerificationService'
import SortTestList from './SortTestList'
import TestVerificationCard from './TestVerificationCard'
import AppButton from './AppButton'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
//"BillPaymentType": "DueCollection",
//"FiscalYearid": 1,
//"Gender": "Female-2 yrs",
//"PatientName": " Test  Test",
//"Referrer": "Self",
//"ReportDelivery": null,
//"ReportPriority": "",
//"ReportStatus": "Pending",
//"ReportType": "Normal",
//"Requestor": "Self",
//"SampleId": 3,
//"Test": "Glucose F, Complete Blood Count",

const ReportVerficationCard = ({ data, retDis, disable }) => {

  const GenderAge = data.Gender.split("-")
  // console.log("g age", GenderAge);
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [AllTestList, setAllTestList] = useState();
  const dispatch = useDispatch()

  const handleclick = () => {
    retDis(true);
    let nData = {
      "sampleid": data.SampleId,
      "fiscalyear": data.FiscalYearid
    }

    dispatch(GetTestListToViewOrVerifyInSummaryReportS(nData, (res) => {
      // console.log('response', typeof (res?.RecordList));
      if (res?.RecordList !== []) {
        setAllTestList(res?.RecordList)
      }
    }))
    SortTestList(AllTestList)
    setIsModalVisible(prevState => !prevState)
  }

  const renderItem = ({ item }) => (
    <TestVerificationCard data={item}></TestVerificationCard>
  )

  const onVerifyAll = () => {
    Alert.alert(
      'Alert !',
      'Are you sure you want to verify all ?',
      [
        {
          text: 'OK', onPress: () => {
          }
        }
      ]
    )
  }

  return (
    <>
      <Pressable onPress={() => handleclick()} style={styles.cardCotainer} disabled={disable}>
        <View style={[styles.cardBody, GlobalStyles.boxShadow, {
          // borderLeftColor: '#205072',
          borderLeftColor: data.ReportType === 'Normal' ? '#1db0dd' : '#e43333',
        }]}>
          <View style={styles.cardtop}>
            <View>
              <Text style={[styles.ctitle, GlobalStyles.heading]}>Id: {data.SampleId}</Text>
              <View style={styles.fdRow}>
                <Text style={[styles.ctitle, GlobalStyles.body]}>Name: </Text>
                <Text style={[styles.cBody, GlobalStyles.body]}>{data.PatientName}</Text>
              </View>
              <View style={styles.fdRow}>
                <Text style={[styles.ctitle, GlobalStyles.body]}>Report Type: </Text>
                <Text style={[styles.cBody, GlobalStyles.body]}>{data.ReportType}</Text>
              </View>
            </View>
            <BadgeStatus
              RequestStatus={data.ReportStatus}
              // IsPaid={true}
              PaymentType={data.BillPaymentType}
              ReportDelivery={data.ReportDelivery}

            ></BadgeStatus>
          </View>
          {/* <Text style={styles.remarks}>Request Id: {data.RequestId}</Text> */}
          {/* <Text style={styles.cDate}>{data.CollectionReqDate}</Text> */}
          {/* <DateBadge date={data.CollectionReqDate}></DateBadge> */}
          {/* {
            IsVisibele && */}
          <>
            <View style={[styles.fdRow, styles.spaceBetween]}>
              <View style={styles.fdRow}>
                <Text style={[styles.ctitle, GlobalStyles.body]}>Gender: </Text>
                <Text style={[styles.cBody, GlobalStyles.body]}>{GenderAge[0]}</Text>

              </View>
              <View style={styles.fdRow}>
                <Text style={[styles.ctitle, GlobalStyles.body]}>Age: </Text>
                <Text style={[styles.cBody, GlobalStyles.body]}>{GenderAge[1]}</Text>
              </View>
            </View>
            <View>
              <Text style={[styles.ctitle, GlobalStyles.body]}>Referrer </Text>
              <Text style={[styles.cBody, GlobalStyles.body]}>{data.Referrer}</Text>
            </View>
            <View>
              <Text style={[styles.ctitle, GlobalStyles.body]}>Referrer:</Text>
              <Text style={[styles.cBody, GlobalStyles.body]}>{data.Requestor}</Text>
            </View>
            <View>
              <Text style={[styles.ctitle, GlobalStyles.body]}>Tests:</Text>
              <Text style={[styles.cBody, GlobalStyles.body]}>{data.Test}</Text>
            </View>
            {/* <View>
                <Text style={styles.ctitle}>Age: {data.Referrer}</Text>
                <Text style={styles.ctitle}>Gender: {data.Requestor}</Text>
              </View> */}
          </>
          {/* } */}



        </View>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={IsModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!IsModalVisible)
          retDis(false);
          // setActive(true);
        }}

      >

        <View style={styles.centeredView}>
          <View style={GlobalStyles.modalContainer}>
            <View style={styles.top}>
              <Text style={[GlobalStyles.heading, {
                color: '#fefefe'
              }]}>Test name</Text>
              <Pressable
                style={{
                  position: 'absolute',
                  top: 7,
                  right: 10,
                  backgroundColor: '#fefefe',
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  setIsModalVisible(!IsModalVisible)
                  retDis(false);
                }}>
                <Icon
                  name={'close'}
                  color={secodaryCardColor}
                  type='antdesign'
                  size={20}
                ></Icon>
              </Pressable>
            </View>

            <View>

            </View>
            <FlatList
              data={AllTestList}
              renderItem={renderItem}
              keyExtractor={item => item.PanId}
            // inverted={true}
            ></FlatList>

            <View style={[styles.bot, GlobalStyles.boxShadow]}>
                <Text></Text>
                <AppButton title="Verify All" onPress={() => onVerifyAll()}></AppButton>
            </View>
          </View>


        </View>
      </Modal>
    </>
  )
}

export default ReportVerficationCard

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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 6,

    shadowColor: "#101010",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardtop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fdRow: {
    flexDirection: 'row'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  ctitle: {
    color: primary
  },
  cBody: {
    color: secondary
  },
  centeredView: {
    width: '100%',
    height: windowHeight,
    // backgroundColor: '#141516e1'
    // backgroundColor: '#fefefe'
  },
  top: {
    height: 60,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: secondary
  },
  bot:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fefefe',
    padding: 10,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  }
})