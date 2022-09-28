import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetPatientList } from "../../Services/appServices/AssignPatient";
import { useIsFocused } from "@react-navigation/native";
import Header from "../../components/Header";
import PatientInfoCard from "../../components/ui/PatientInfoCard";

const BookTestHomeScreen = () => {
  const [PatietList, setPatietList] = useState();
  const [NewData, setNewData] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [disable, setdisable] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(
        GetPatientList((res) => {
          setPatietList(res.requestorcollectionList);
          setNewData(res.requestorcollectionList);
        })
      );
    }
    setdisable(false);
  }, [isFocused]);

  const renderItem = ({ item }) => (
    // <PatientCard data={item} />
    <PatientInfoCard
      data={item}
      AsignedTask
      disable={disable}
      retDis={handleDisable}
    ></PatientInfoCard>
  );
  const handleDisable = (e) => {
    // console.log('disable', e)
    setdisable(e);
  };

  const handleChange = (val) => {
    if (val === undefined || val === "") {
      setNewData(PatietList);
    } else {
      setNewData(val);
    }
    // console.log("redyrned", newData);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(
        GetPatientList((res) => {
          setPatietList(res.requestorcollectionList);
          setNewData(res.requestorcollectionList);
        })
      );
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* <ImageBackground
        source={require('../../assets/images/bkg8.png')}
        resizeMode="cover"
        style={styles.bkgImg}
      > */}
      {/* <HamMenu></HamMenu>
        <BackBtn></BackBtn> */}
      <Header
        data={PatietList}
        returnData={handleChange}
        bookTestFilter
        title={"Patients"}
      ></Header>
      <View style={styles.container}>
        {/* <Filter data={PatietList} returnData={handleChange} bookTestFilter></Filter> */}
        <FlatList
          data={NewData}
          renderItem={renderItem}
          keyExtractor={(item) => item.CId}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>

      {/* </ImageBackground> */}
    </View>
  );
};

export default BookTestHomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bkgImg: {
    paddingTop: 40,
    width: Dimensions.get("window").width * 1,
    // height: Dimensions.get('window').height * 1,
    flex: 1,
  },
  container: {
    // marginTop: 40,
    flex: 1,
  },
});
