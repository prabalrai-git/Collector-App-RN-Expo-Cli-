import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GlobalStyles } from '../../GlobalStyle'
import BadgeStatus from './BadgeStatus'

const windowWidth = Dimensions.get('window').width

// "BillPaymentType": "DueCollection",
//       "FiscalYearid": 1,
//       "Gender": "Female-2 yrs",
//       "PatientName": " Test  Test",
//       "Referrer": "Self",
//       "ReportDelivery": null,
//       "ReportPriority": "",
//       "ReportStatus": "Pending",
//       "ReportType": "Normal",
//       "Requestor": "Self",
//       "SampleId": 3,
//       "Test": "Glucose F, Complete Blood Count",

const ReportVerficationCard = ({ data }) => {

  const [IsVisibele, setIsVisibele] = useState(false)
  const GenderAge = data.Gender.split("-")
  console.log("g age",GenderAge );

  const hadleEvent = () => {
    setIsVisibele(prev => !prev)
  }
  return (
    <>
      <Pressable onPress={() => hadleEvent()} style={styles.cardCotainer}>
        <View style={[styles.cardBody, GlobalStyles.boxShadow, {
          // borderLeftColor: '#205072',
          borderLeftColor: 'red',
        }]}>
          <View style={styles.card}>
            <Text style={styles.ctitle}>Sample Id: {data.SampleId}</Text>
            <Text style={styles.ctitle}>{data.PatientName}</Text>
            <Text style={styles.ctitle}>{data.ReportType}</Text>
            {/* <Text style={styles.remarks}>Request Id: {data.RequestId}</Text> */}
            {/* <Text style={styles.cDate}>{data.CollectionReqDate}</Text> */}
            {/* <DateBadge date={data.CollectionReqDate}></DateBadge> */}
            {
              IsVisibele &&
              <View>
                <Text style={styles.ctitle}>{GenderAge[0]}</Text>
                <Text style={styles.ctitle}>{GenderAge[1]}</Text>
              </View>
            }
          </View>
          <BadgeStatus
            RequestStatus={data.ReportStatus}
            IsPaid={true}
          ></BadgeStatus>
        </View>
      </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
})