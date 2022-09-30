import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TaskCard from "../../components/ui/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { GetCollectorRequestByCollectorWiseForWeek } from "../../Services/appServices/AssignPatient";
import { useIsFocused } from "@react-navigation/native";

const RejectedTask = () => {
  const [PatietList, setPatietList] = useState();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [disComplete, setdisComplete] = useState(false);
  const [SortedData, setSortedData] = useState();

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.storeUserData);
  const [disable, setdisable] = useState(false);

  useEffect(() => {
    handleClick();
  }, [isFocused]);

  useEffect(() => {
    sortData();
    setdisComplete(false);
  }, [disComplete]);

  const handleClick = () => {
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
  const renderItem = ({ item }) => (
    <TaskCard data={item} rejected disable={disable} retDis={handleDisable} />
  );

  const handleDisable = (e) => {
    // console.log('disable', e)
    setdisable(e);
  };

  const sortData = () => {
    let tempArr = [];
    // console.log("PatietList", PatietList.length);
    // return
    if (PatietList !== undefined) {
      PatietList.map((e) => {
        // console.log(e.RequestStatus);
        if (e.SampleStatus !== null) {
          e.SampleStatus.includes("Rejected") ? tempArr.push(e) : "";
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

export default RejectedTask;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
});
