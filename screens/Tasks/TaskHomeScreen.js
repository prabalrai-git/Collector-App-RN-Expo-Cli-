import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetSampleRequestListByCollector } from "../../Services/appServices/AssignPatient";
import HamMenu from "../../components/ui/HamMenu";
import BackBtn from "../../components/ui/BackBtn";
import SampleCard from "../Sample/SampleCard";

const renderItem = ({ item }) => (
  // <TaskCard data={item} />
  <SampleCard item={item} />
);

const TaskHomeScreen = () => {
  const [PatietList, setPatietList] = useState();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());

  const dispatch = useDispatch();
  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = () => {
    const fromDate = `${
      FromDate.getFullYear() +
      "-" +
      (FromDate.getMonth() + 1) +
      "-" +
      FromDate.getDate()
    }`;
    const toDate = `${
      ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + 4
    }`;
    const collectorId = 3;
    const data = {
      fromDate: fromDate,
      toDate: toDate,
      collectorId: collectorId,
    };
    // console.log(data);
    dispatch(
      GetSampleRequestListByCollector(data, (res) => {
        setPatietList(res.RequestList);
        // console.log('res',res);
      })
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../../assets/images/bkg1.png")}
        resizeMode="cover"
        style={styles.bkgImg}
      >
        <HamMenu></HamMenu>
        <BackBtn></BackBtn>
        <FlatList
          data={PatietList}
          renderItem={renderItem}
          keyExtractor={(item) => item.RId}
        />
      </ImageBackground>
    </View>
  );
};

export default TaskHomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 10,
    flexDirection: "column",
    flex: 1,
  },
  bkgImg: {
    width: Dimensions.get("window").width * 1,
    flex: 1,
    paddingTop: 90,
  },
});
