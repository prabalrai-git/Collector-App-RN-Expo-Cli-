import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCollectionRequestHistory } from "../../Services/appServices/AssignPatient";
import { useIsFocused } from "@react-navigation/native";
import Header from "../../components/Header";
import PreTestCard from "../../components/ui/PreTestCard";
import LodaingComp from "../../components/ui/LodaingComp";

const PrevioiusRequest = ({ route }) => {
  // console.log("route", route.params.data);
  const [PatietList, setPatietList] = useState();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [disComplete, setdisComplete] = useState(false);
  const [SortedData, setSortedData] = useState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.storeUserData);
  // console.log('user');
  const [disable, setdisable] = useState(false);

  useEffect(() => {
    handleClick();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <PreTestCard data={item} disable={disable} retDis={handleDisable} />
  );

  const handleDisable = (e) => {
    // console.log('disable', e)
    setdisable(e);
  };

  const handleClick = () => {
    let data = {
      patid: route.params.data.CId,
      collectorId: user.userData.UserId,
    };
    // console.log("potato",data);
    // return
    dispatch(
      GetCollectionRequestHistory(data, (res) => {
        if (res?.PatientWiseCollectionHistory.length > 0) {
          setPatietList(res.PatientWiseCollectionHistory);
        } else {
        }
      })
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header></Header>
      {PatietList === undefined && <LodaingComp isLoading={true}></LodaingComp>}

      <FlatList
        data={PatietList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}${item.RId}`}
      />
    </View>
  );
};

export default PrevioiusRequest;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
});
