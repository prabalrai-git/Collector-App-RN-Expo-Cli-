import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCollectorRequestByCollectorWiseForWeek } from "../../Services/appServices/AssignPatient";
import { useIsFocused } from "@react-navigation/native";
import TaskCard from "../../components/ui/TaskCard";

const CompletedTask = () => {
  const [PatietList, setPatietList] = useState();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [disComplete, setdisComplete] = useState(false);
  const [SortedData, setSortedData] = useState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.storeUserData);
  const [disable, setdisable] = useState(false);

  useEffect(() => {
    handleClick();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TaskCard data={item} completed disable={disable} retDis={handleDisable} />
  );

  const handleDisable = (e) => {
    // console.log('disable', e)
    setdisable(e);
  };

  useEffect(() => {
    sortData();
    setdisComplete(false);
  }, [disComplete]);

  const handleClick = () => {
    // const fromDate = `${FromDate.getFullYear() + "-" + (FromDate.getMonth() + 1) + "-" + FromDate.getDate()}`
    // const toDate = `${ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + ToDate.getDate()}`
    // const collectorId = 3
    // const data = {
    //   'fromDate': fromDate,
    //   'toDate': toDate,
    //   'collectorId': collectorId

    // }
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

  const sortData = () => {
    let tempArr = [];
    if (PatietList !== undefined) {
      PatietList.map((e) => {
        if (e.SampleStatus !== null) {
          e.SampleStatus.includes("Lab Received") ? tempArr.push(e) : "";
        }
        setSortedData(tempArr);
      });
    } else {
    }
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={SortedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}${item.RId}`}
      />
    </View>
  );
};

export default CompletedTask;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
});
