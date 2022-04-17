import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import StatusBadge from './StatusBadge';
import { Icon } from 'react-native-elements';
import BadgeStatus from './BadgeStatus';
import DateBadge from './DateBadge';
import { GlobalStyles } from '../../GlobalStyle';


const windowWidth = Dimensions.get('window').width


const PreTestCard = ({ data, disable, retDis }) => {
  // console.log('data', data.SampleStatus);
  const [isVisibe, setisVisibe] = useState(false);
  const tests = data.Test;
  const TestList = tests.split(",");
  // const [active, setActive] = useState(false);

  const hadleEvent = () => {
    setisVisibe(true);
    retDis(true);
  }


  return (
    <>
      <Pressable disabled={disable} onPress={() => hadleEvent()} style={styles.cardCotainer}>
        <View style={styles.cardBody}>
          <Icon
            name={'lab-flask'}
            color={'#FF7F00'}
            type='entypo'
            style={styles.icon}
            size={30}
          ></Icon>
          <View style={styles.card}>
            <Text style={styles.ctitle}>Request Id: {data.RId}</Text>
            <DateBadge date={data.CollectedDate}></DateBadge>
          </View>
          <BadgeStatus RequestStatus={data.SampleStatus}></BadgeStatus>
        </View>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibe}
        onRequestClose={() => {
          setisVisibe(!isVisibe)
          retDis(false);
          // setActive(true);
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
              retDis(false);
              // setActive(true);
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
                  <Text >Request ID :</Text>
                  <Text style={{ color: "#FF7F00" }}> {data.RId}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text >Cliet ID : </Text>
                  <Text style={{ color: "#FF7F00" }}>{data.PatId}</Text>
                </View>
              </View>

            </View>

            <StatusBadge RequestStatus={data.SampleStatus}></StatusBadge>


            {/* <View style={styles.flatListContainer}>
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
                    <Text style={styles.testsText}>{item}</Text>
                  </View>
                }
                keyExtractor={(item, index) => `${item.SId}${index}`}
              />
            </View>
            <View>
              <View style={styles.testCard}>
                <Text style={styles.titleText}>Total</Text>
                <Text style={styles.finsltestsPrice}>Rs.{data.TestTotalAmount}</Text>
              </View>
              <View style={styles.testCard}>
                <Text style={styles.titleText}>Collection Charge</Text>
                <Text style={styles.finsltestsPrice}>Rs.{data.CollectionCharge}</Text>
              </View>
              <View style={styles.testCard}>
                <Text style={styles.titleText}>Discount Amout</Text>
                <Text style={styles.finsltestsPrice}>Rs.{data.DiscountAmount}</Text>
              </View>
              <View style={styles.testCard}>
                <Text style={styles.titleText}>Grand Total</Text>
                <Text style={styles.finsltestsPrice}>Rs.{data.GrandTotal}</Text>
              </View>
            </View> */}

            <View style={[styles.cardContainer, GlobalStyles.boxShadow]}>
              <View style={styles.flatListContainer}>
                <Text style={styles.title}>Tests</Text>

                {
                  TestList !== undefined ?
                    TestList.map((e) => (
                      <View style={styles.testCard} key={e.TestName}>
                        <Text style={styles.testsText}>{e}</Text>
                        {/* <Text style={styles.testsPrice}>Rs.{e.TestPrice}</Text> */}
                      </View>
                    )) : null
                }
              </View>
              <View>
                <Text style={styles.title}>Payment Details</Text>
                <View style={styles.testCard}>
                  <Text style={styles.titleText}>Total</Text>
                  <Text style={styles.finsltestsPrice}>Rs.{data.TestTotalAmount}</Text>
                </View>
                <View style={styles.testCard}>
                  <Text style={styles.titleText}>Collection Charge</Text>
                  <Text style={styles.finsltestsPrice}>Rs.{data.CollectionCharge}</Text>
                </View>
                <View style={styles.testCard}>
                  <Text style={styles.titleText}>Discount Amout</Text>
                  <Text style={styles.finsltestsPrice}>Rs.{data.DiscountAmount}</Text>
                </View>
                <View style={styles.testCard}>
                  <Text style={styles.titleText}>Grand Total</Text>
                  <Text style={styles.finsltestsPrice}>Rs.{data.GrandTotal}</Text>
                </View>
              </View>
            </View>

            {
              data.SampleStatus === "Rejected" &&
              <View style={[styles.testList, { backgroundColor: '#f36f5e' }]}>
                <Text style={{
                  color: '#fefefe',
                  fontSize: 18,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>Sample Rejcted</Text>
                <Text style={{
                  color: '#fefefe',
                  fontSize: 16,
                  marginBottom: 10,
                  letterSpacing: 1,
                }}>Due to perticular reason, the sample has been rejected.</Text>
              </View>
            }

            {
              data.SampleStatus === "Collected" &&
              <View style={[styles.testList, { backgroundColor: '#f36f5e' }]}>
                <Text style={{
                  color: '#fefefe',
                  fontSize: 18,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>Sample Collected</Text>
                <Text style={{
                  color: '#fefefe',
                  fontSize: 16,
                  marginBottom: 10,
                  letterSpacing: 1,
                }}>Sample has been collected, by user ID</Text>
              </View>
            }

            {
              data.SampleStatus === "Lab Received" &&
              <View style={[styles.testList, { backgroundColor: '#5ebcf3' }]}>
                <Text style={{
                  color: '#fefefe',
                  fontSize: 18,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>Sample Lab Collected</Text>
                <Text style={{
                  color: '#fefefe',
                  fontSize: 16,
                  marginBottom: 10,
                  letterSpacing: 1,
                }}>Sample has been received By lab</Text>
              </View>
            }

            {
              data.SampleStatus === "Report Dispatched" &&
              <View style={[styles.testList, { backgroundColor: '#5ebcf3' }]}>
                <Text style={{
                  color: '#fefefe',
                  fontSize: 18,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>Report Dispatched</Text>
                <Text style={{
                  color: '#fefefe',
                  fontSize: 16,
                  marginBottom: 10,
                  letterSpacing: 1,
                }}>The Report is submited</Text>
              </View>
            }

          </View>
        </View>
      </Modal>


    </>
  )
}

export default PreTestCard

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
  centeredView: {
    width: '100%',
    flex: 1,
    backgroundColor: '#F9F9F9'
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
    marginLeft: 10,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  name: {
    width: windowWidth * 0.6,
    color: '#205072',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.3,
    marginBottom: 6
  },
  flatListContainer: {
    width: windowWidth - 20,
    marginHorizontal: 10,
    // flex: 0.55,
    maxHeight: 200,
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
    // paddingHorizontal: 5,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'space-between'
  },
  testsText: {
    color: "#232325",
    fontSize: 14,
    letterSpacing: 1.2,
    // marginLeft: 20,
    width: windowWidth * 0.75
  },
  testsPrice: {
    width: windowWidth * 0.4,
    color: '#FF7F00'
  },
  finsltestsPrice: {
    borderWidth: 1,
    borderColor: '#efed11',
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 3,
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
    // marginLeft: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    width: windowWidth - 20,

  },

})