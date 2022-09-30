import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const ReqRefPicker = () => {
  const dispatch = useDispatch();

  const [Requestorlist, setRequestorlist] = useState();
  const [RequestorlistNew, setRequestorlistNew] = useState();
  const [ReferedList, setReferedList] = useState();
  const [ReferedListNew, setReferedListNew] = useState();

  useEffect(() => {
    dispatch(
      GetRequestor((res) => {
        // console.log(res);
        setRequestorlist(res?.requestorList);
        setRequestorlistNew(res?.requestorList);
      })
    );
    dispatch(
      GetReferred((res) => {
        // console.log(res);
        setReferedList(res?.ReferredDoctorList);
        setReferedListNew(res?.ReferredDoctorList);
      })
    );
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: secodaryCardColor,
          padding: 10,
          borderRadius: 50,
        }}
        onPress={() => {
          setisVisibeRef(false);
          // setisRemarksVisible(false)
          // retDis(false);
        }}
      >
        <Icon
          name={"close"}
          color={"#fefefe"}
          type="antdesign"
          size={20}
        ></Icon>
      </TouchableOpacity>
      <Filter data={ReferedList} returnData={handleChangeReq} forReq></Filter>
    </View>
  );
};

export default ReqRefPicker;

const styles = StyleSheet.create({});
