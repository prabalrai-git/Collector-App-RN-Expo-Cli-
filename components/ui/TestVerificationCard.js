import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../GlobalStyle'
import AppButton from './AppButton'

const windowWidth = Dimensions.get('window').width

// "CheckedBy": null,
//     "D_group": 2,
//     "Designation": null,
//     "DigId": 59,
//     "GroupId": 4,
//     "GroupName": "Renal Function Test(RFT)",
//     "IsCulture": false,
//     "Max": "135.0-146.0 ",
//     "Method": "Ion selective electrode",
//     "Note": null,
//     "PanId": 137,
//     "Panel": "BIO CHEMISTRY REPORT",
//     "Range": null,
//     "RegNo": null,
//     "Specimen": "Serum(1ml)",
//     "SubGroupId": false,
//     "SubUnit": "",
//     "TestResult": null,
//     "TestSubType": null,
//     "Testname": "Sodium",
//     "Units": "mmol/L",
//     "submethod": null,
//     "subresult": null,
//     "subtestId": null,
const TestVerificationCard = ({ data }) => {
  return (
    <View style={styles.cardCotainer}>
      <View style={[styles.cardBody, GlobalStyles.boxShadow]}>
        <View style={styles.cardLeft}>
          <Text style={[styles.ctitle, GlobalStyles.body]}>{data.Testname}</Text>
          <View style={styles.fdRow}>
            <Text style={[styles.ctitle, GlobalStyles.body]}>Test Result: </Text>
            <Text style={[styles.cBody, GlobalStyles.body]}>{data.TestResult}</Text>
          </View>
          <View style={styles.fdRow}>
            <Text style={[styles.ctitle, GlobalStyles.caption]}>Range: </Text>
            <Text style={[styles.cBody, GlobalStyles.caption]}>{data.Max}</Text>
          </View>
          
        </View>
        <AppButton title={'verify'}></AppButton>
      </View>
      {/* <Text style={styles.remarks}>Request Id: {data.RequestId}</Text> */}
      {/* <Text style={styles.cDate}>{data.CollectionReqDate}</Text> */}
      {/* <DateBadge date={data.CollectionReqDate}></DateBadge> */}


    </View>
  )
}

export default TestVerificationCard

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
  cardLeft: {
    // flexDirection: 'row',
    // justifyContent: 'space-between'
    width: windowWidth * 0.6,
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
})