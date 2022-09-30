import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { dummyData } from "../../dumyData";
import { useDispatch, useSelector } from "react-redux";
import { GetCollectorRequestByCollectorWiseForWeek } from "../../Services/appServices/AssignPatient";
import TaskCard from "../../components/ui/TaskCard";
import { useIsFocused } from "@react-navigation/native";

// Object {
//   "CId": 75,
//   "CollectionReqDate": "2022-04-06T10:59:26",
//   "CollectorId": 3,
//   "EnterBy": 3,
//   "EntryDate": "2022-04-06T10:59:51",
//   "PatientAddress": "{\"latitude\":27.717199721017852,\"longitude\":85.32399991527198}",
//   "PatientAge": "28",
//   "PatientEmailId": "",
//   "PatientFName": "Three",
//   "PatientGender": "male",
//   "PatientLName": "Three",
//   "PatientMName": "",
//   "PatientReferedBy": 1,
//   "PatientRequestorBy": 1,
//   "RequestId": 61,
//   "RequestStatus": 6,
//   "SampleStatus": "Lab Received",
// },

const AssignedTask = () => {
  const [asignedData, setAsignedData] = useState(dummyData.RequestList);
  // const [asignedData, setAsignedData] = useState();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [SortedData, setSortedData] = useState();
  const [PatietList, setPatietList] = useState([]);
  const dispatch = useDispatch();
  const [disComplete, setdisComplete] = useState(false);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.storeUserData);
  const [disable, setdisable] = useState(false);

  // console.log("user ", user.userData.usrUserId);
  useEffect(() => {
    handleRequestList();
    setdisable(false);
  }, [isFocused]);

  useEffect(() => {
    sortData();
    setdisComplete(false);
  }, [disComplete]);

  const renderItem = ({ item }) => (
    <TaskCard
      data={item}
      AsignedTask
      disable={disable}
      retDis={handleDisable}
    />
  );
  const handleDisable = (e) => {
    // console.log('disable', e)
    setdisable(e);
  };

  const handleRequestList = () => {
    dispatch(
      GetCollectorRequestByCollectorWiseForWeek(user.userData.UserId, (res) => {
        if (res?.WeekWiseSampleDetailsByCollectorId.length > 0) {
          setPatietList(res.WeekWiseSampleDetailsByCollectorId);
          setdisComplete(true);
        } else {
        }
      })
    );
  };
  // console.log(PatietList);
  const sortData = () => {
    let tempArr = [];
    PatietList.map((e) => {
      // console.log(e.RequestStatus);
      if (e.SampleStatus !== null) {
        e.SampleStatus.includes("Requested") ||
        e.SampleStatus.includes("Asigned")
          ? tempArr.push(e)
          : "";
      }
      setSortedData(tempArr);
    });
  };

  return (
    <View>
      {/* <FlatList
        // data={PatietList}
        data={SortedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}${item.RId}`}
      /> */}
      <ScrollView>
        {SortedData !== undefined &&
          SortedData.map((e, index) => (
            <TaskCard
              data={e}
              AsignedTask
              disable={disable}
              retDis={handleDisable}
              key={`${index}${e.RId}`}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default AssignedTask;

const styles = StyleSheet.create({});
