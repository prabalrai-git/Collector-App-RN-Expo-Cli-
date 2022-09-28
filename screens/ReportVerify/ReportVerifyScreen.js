import {
  Dimensions,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
// import { Icon, SearchBar } from 'react-native-elements';
import AppButton from "../../components/ui/AppButton";
import { useDispatch, useSelector } from "react-redux";
import SelectedItem from "../../components/ui/SelectedItem";
import CancleBtn from "../../components/ui/CancleBtn";
import InputDate from "../../components/ui/InputDate";
import { Picker } from "@react-native-picker/picker";
import {
  GetFiscalYear,
  GetPatientSampleSummaryStatuS,
} from "../../Services/appServices/ReportVerificationService";
import ReportVerficationCard from "../../components/ui/ReportVerficationCard";
import Filter from "../../components/ui/Filter";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReportVerifyScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.storeUserData.userData);
  // console.log(user.UserId);

  const [diagnosticIn, setdiagnosticIn] = useState(false);
  const [diagnosticOut, setdiagnosticOut] = useState(false);
  const [SerchFilter, setSerchFilter] = useState(true);
  const [FiscalYear, setFiscalYear] = useState();
  const [Status, setStatus] = useState(1);
  const [PatientList, setPatientList] = useState();
  const [NewPatientList, setNewPatientList] = useState();
  const [FromDate, setFromDate] = useState("");
  const [Todate, setTodate] = useState("");
  const [disable, setdisable] = useState(false);

  const onChangeFromDate = (e) => {
    // console.log('date e', e);
    let temp1 = JSON.stringify(e);
    let temp = temp1.split("T");
    setFromDate(temp[0].slice(1));
  };
  const onChangeToDate = (e) => {
    // console.log('date 222', e);
    let temp1 = JSON.stringify(e);
    let temp = temp1.split("T");
    setTodate(temp[0].slice(1));
  };

  // console.log('focal year', typeof(FiscalYear));

  useEffect(() => {
    // setSerchFilter(true)
    dispatch(
      GetFiscalYear((res) => {
        // console.log("res type", typeof res.FIscalYearCode);
        if (res !== undefined) {
          setFiscalYear(res?.FIscalYearCode);
        }
      })
    );
  }, []);

  const handleClick = () => {
    // console.log('potato');
    let today = new Date();
    const newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T" +
      today.toLocaleTimeString();

    setPatientList([]);
    let data = {
      // "from": FromDate,
      // "to": Todate,
      // 'ficalyera': Status
      // "from": "2020-1-1",
      // "to": "2022-5-30",
      from: FromDate != "" ? FromDate : newDate,
      to: Todate != "" ? Todate : newDate,
      fiscalyearId: 1,
      testin: "",
      testnotin: "",
      diagnosisin: "",
      diagnosisnotin: "",
    };
    dispatch(
      GetPatientSampleSummaryStatuS(data, (res) => {
        if (res !== []) {
          // console.log('res', res?.CovidDetails);
          setPatientList(res?.CovidDetails);
          setNewPatientList(res?.CovidDetails);
          setSerchFilter(false);
        }
      })
    );
  };

  const renderItem = ({ item }) => (
    <ReportVerficationCard
      data={item}
      retDis={handleDisable}
      disable={disable}
    />
  );

  const handleDisable = (e) => {
    // console.log('disable', e)
    setdisable(e);
  };

  const handleChangeReq = (e) => {
    // console.log('new data', e)
    if (e === undefined || e === "") {
      setNewPatientList(PatientList);
    } else {
      setNewPatientList(e);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Header title={"Reports"}></Header>
          <View>
            {SerchFilter !== true ? (
              <View style={styles.filterContainer}>
                <AppButton
                  title={"Load Item"}
                  onPress={() =>
                    setSerchFilter((previousState) => !previousState)
                  }
                ></AppButton>
                <Filter
                  data={PatientList}
                  returnData={handleChangeReq}
                  forVerification
                ></Filter>
              </View>
            ) : (
              <View style={styles.InputContainer}>
                <View
                  style={[
                    styles.TxtInputContainer,
                    {
                      marginTop: 20,
                    },
                  ]}
                >
                  <InputDate
                    retData={onChangeFromDate}
                    label={"From"}
                    fromDate={FromDate}
                  ></InputDate>
                </View>

                <View style={styles.TxtInputContainer}>
                  <InputDate
                    retData={onChangeToDate}
                    label={"To"}
                    toDate={Todate}
                  ></InputDate>
                </View>

                <View style={styles.TxtInputContainer}>
                  <Text style={styles.inputLabelTxt}>Fical year</Text>
                  <View style={styles.TextInput}>
                    <Picker
                      selectedValue={Status}
                      // style={styles.TextInput}
                      onValueChange={(itemValue) => setStatus(itemValue)}
                      mode="dropdown"
                      // style={styles.TextInput}
                      style={{
                        width: "100%",
                      }}
                    >
                      {FiscalYear !== undefined
                        ? FiscalYear.map((e) => (
                            <Picker.Item
                              label={e.Year}
                              value={e.Id}
                              key={e.Id}
                            />
                          ))
                        : null}
                    </Picker>
                  </View>
                </View>
                <View style={styles.TxtInputContainer}>
                  <View style={styles.switchContainer}>
                    <Text style={styles.inputLabelTxt}>Diagnostic In</Text>
                    <Switch
                      trackColor={{ false: "grey", true: "grey" }}
                      thumbColor={diagnosticIn ? "green" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() =>
                        setdiagnosticIn((previousState) => !previousState)
                      }
                      value={diagnosticIn}
                      style={{
                        marginRight: 90,
                        transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
                      }}
                    />
                  </View>
                  {diagnosticIn && (
                    <View
                      style={[
                        styles.TxtInputContainer,
                        {
                          borderWidth: 1,
                          borderColor: secodaryCardColor,
                          borderRadius: 10,
                          paddingVertical: 10,
                        },
                      ]}
                    >
                      {/* <Text style={styles.inputLabelTxt}>Diagonstic Items</Text> */}
                      <TouchableOpacity
                        // onPress={showToDatepicker}
                        style={styles.SelectInput}
                      >
                        <View
                          style={{
                            width: "100%",
                            flexWrap: "wrap",
                            flexDirection: "row",
                          }}
                        >
                          <SelectedItem title={"titel one"}></SelectedItem>
                          <SelectedItem title={"titel one one"}></SelectedItem>
                          <SelectedItem title={"titel one two"}></SelectedItem>
                          <SelectedItem
                            title={"titel one threee"}
                          ></SelectedItem>
                          <SelectedItem
                            title={"titel one one one one"}
                          ></SelectedItem>
                          <SelectedItem
                            title={"titel one potato"}
                          ></SelectedItem>
                          <SelectedItem title={"titel one"}></SelectedItem>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={styles.TxtInputContainer}>
                  <View style={styles.switchContainer}>
                    <Text style={styles.inputLabelTxt}>Diagnostic Out</Text>

                    <Switch
                      trackColor={{ false: "grey", true: "grey" }}
                      thumbColor={diagnosticOut ? "green" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() =>
                        setdiagnosticOut((previousState) => !previousState)
                      }
                      value={diagnosticOut}
                      style={{
                        marginRight: 90,
                        transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
                      }}
                    />
                  </View>
                  {diagnosticOut && (
                    <View
                      style={[
                        styles.TxtInputContainer,
                        {
                          borderWidth: 1,
                          borderColor: secodaryCardColor,
                          borderRadius: 10,
                          paddingVertical: 10,
                        },
                      ]}
                    >
                      <TouchableOpacity
                        // onPress={showToDatepicker}
                        style={styles.SelectInput}
                      >
                        <View
                          style={{
                            width: "100%",
                            flexWrap: "wrap",
                            flexDirection: "row",
                          }}
                        >
                          <SelectedItem title={"titel one"}></SelectedItem>
                          <SelectedItem title={"titel one one"}></SelectedItem>
                          <SelectedItem title={"titel one two"}></SelectedItem>
                          <SelectedItem
                            title={"titel one threee"}
                          ></SelectedItem>
                          <SelectedItem
                            title={"titel one one one one"}
                          ></SelectedItem>
                          <SelectedItem
                            title={"titel one potato"}
                          ></SelectedItem>
                          <SelectedItem title={"titel one"}></SelectedItem>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: windowWidth - 40,
                    marginBottom: 20,
                  }}
                >
                  <AppButton
                    title={"Load"}
                    onPress={() => handleClick()}
                  ></AppButton>
                  <Text> </Text>
                  <CancleBtn
                    title={"Cancle"}
                    onPress={() => setSerchFilter(!SerchFilter)}
                  ></CancleBtn>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.listcontainer}>
          {/* {
            isLoading === false ?
              <FlatList
                data={RequestList}
                renderItem={renderItem}
                keyExtractor={item => item.RId}
              ></FlatList>
              :
              <LodaingComp></LodaingComp>
          } */}
          {NewPatientList !== undefined && (
            <FlatList
              data={NewPatientList}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.SampleId}${index}`}
              // inverted={true}
            ></FlatList>
          )}
        </View>
      </View>
    </View>
  );
};

export default ReportVerifyScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // height: '100%',
    height: windowHeight,
    flexDirection: "column",
    backgroundColor: "#F9F9F9",
    // backgroundColor: 'red'
  },
  top: {
    backgroundColor: secodaryCardColor,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    overflow: "hidden",
    paddingBottom: 10,
  },
  dateFiltercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: secodaryCardColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  TxtInputContainer: {
    marginBottom: 10,
  },
  TextInput: {
    width: windowWidth - 40,
    alignItems: "center",
    backgroundColor: "#fefefe",
    borderRadius: 5,
    justifyContent: "center",
    height: 50,
    borderWidth: 1,
    borderColor: secodaryCardColor,
  },
  inputLabelTxt: {
    color: primary,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  inputField: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  InputContainer: {
    // justifyContent: 'center',
    alignItems: "center",
    width: windowWidth - 20,
    marginLeft: 10,
    marginTop: 10,
    // paddingVertical: 20,
    // paddingTop: 40,
    // paddingBottom: 20,
    borderRadius: 10,
    flexDirection: "column",
    backgroundColor: "#fefefefe",
    overflow: "hidden",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: windowWidth - 20,
    marginLeft: 10,
    // marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  txtInput: {
    width: windowWidth - 20,
    backgroundColor: "red",
  },
  switchContainer: {
    width: windowWidth - 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  SelectInput: {
    flexWrap: "wrap",
    flexDirection: "column",
    width: windowWidth - 40,
  },
  listcontainer: {
    justifyContent: "center",
    width: windowWidth,
    height: windowHeight,
    flexDirection: "row",
    // backgroundColor: '#1a7086'
  },
});
