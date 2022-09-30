import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-elements";

const windowWidth = Dimensions.width * 0.5;
const Filter = ({
  data,
  returnData,
  bookTestFilter,
  selectTestFilter,
  forReq,
  forRef,
  forVerification,
}) => {
  // console.log(data);
  // console.log("data" ,data.Test);
  const [search, setSearch] = useState("");

  const handlSearch = (val) => {
    const pushArr = [];
    {
      selectTestFilter &&
        data.map((e) => {
          e.Test.toLowerCase().includes(val.toLowerCase())
            ? pushArr.push(e)
            : "";
          // console.log('e', e.Test)
        });
    }
    // "CId": 18,
    // "CollectionReqDate": "2022-03-20T13:07:21.643",
    // "CollectorId": 3,
    // "EnterBy": 15,
    // "EntryDate": "2022-03-20T13:07:21.643",
    // "PatientAddress": "sample string 9",
    // "PatientAge": "sample str",
    // "PatientEmailId": "sample string 8",
    // "PatientFName": "sample string 3",
    // "PatientGender": "sample str",
    // "PatientLName": "sample string 5",
    // "PatientMName": "sample string 4",
    // "PatientNationalId": "sample string 12",
    // "PatientReferedBy": 10,
    // "PatientRequestorBy": 11,
    // "Remarks": "sample string 13",

    {
      bookTestFilter &&
        data !== undefined &&
        data.map((e) => {
          e.PatientFName.toLowerCase().includes(val.toLowerCase()) ||
          e.PatientLName.toLowerCase().includes(val.toLowerCase())
            ? pushArr.push(e)
            : "";
          // console.log('e', e.Test)
        });
    }
    // console.log("pushed arrr",pushArr);

    {
      forReq &&
        data !== undefined &&
        data.map((e) => {
          e.Requestor.toLowerCase().includes(val.toLowerCase())
            ? pushArr.push(e)
            : "";
          // console.log('e', e.Test)
        });
    }
    {
      forRef &&
        data !== undefined &&
        data.map((e) => {
          e.Name.toLowerCase().includes(val.toLowerCase())
            ? pushArr.push(e)
            : "";
          // console.log('e', e.Test)
        });
    }
    {
      forVerification &&
        data !== undefined &&
        data.map((e) => {
          e.PatientName.toLowerCase().includes(val.toLowerCase())
            ? pushArr.push(e)
            : "";
        });
    }
    // console.log(data);
    // {
    //   forColl &&
    // }

    returnData(pushArr);
  };

  useEffect(() => {
    handlSearch(search);
  }, [search]);

  return (
    <View>
      {forVerification ? (
        <SearchBar
          placeholder="Search..."
          onChangeText={(e) => setSearch(e)}
          value={search}
          platform="ios"
          containerStyle={{ backgroundColor: secodaryCardColor, width: 240 }}
          inputContainerStyle={{ backgroundColor: "#fefefe" }}
          cancelButtonProps={{
            color: "#fefefe",
          }}
          // showLoading = {true}
        ></SearchBar>
      ) : (
        <SearchBar
          placeholder="Search..."
          onChangeText={(e) => setSearch(e)}
          value={search}
          platform="ios"
          containerStyle={{ backgroundColor: secodaryCardColor }}
          inputContainerStyle={{ backgroundColor: "#fefefe" }}
          cancelButtonProps={{
            color: "#fefefe",
          }}
          // showLoading = {true}
        ></SearchBar>
      )}
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({});
