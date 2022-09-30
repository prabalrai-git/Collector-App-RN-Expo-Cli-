import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";

const windowWidth = Dimensions.get("window").width * 0.65;
// "Id": 22,
// "Price": 2700,
// "Seq": 79,
// "Test": "Buddha Airline Basic Health Check-Up (B)",
// "TestType": "Executive",

const SelectTestCard = ({ data, retData, arrData }) => {
  // console.log("stt",data);
  const [slected, setSelected] = useState(false);

  useEffect(() => {
    if (arrData.includes(data)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [retData]);

  const selectedFun = (e) => {
    retData(e);
    // setSelected(!slected)e
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.left}>
            <Text style={styles.title}>{data.Test}</Text>
            <Text style={styles.price}>Rs. {data.Price}</Text>
          </View>
          <View style={styles.right}>
            <CheckBox
              checked={slected}
              checkedColor={"#4688B3"}
              uncheckedColor={"dimgray"}
              onPress={() => selectedFun(data)}
            />
            {/* <Button onPress={() => selectedFun(data)} title={'add'}></Button> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SelectTestCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fefefe",
    alignItems: "center",
    shadowColor: "#ecdcae",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  "card:last-child": {
    marginBottom: 100,
  },
  title: {
    fontSize: 14,
    width: windowWidth,
  },
  price: {
    color: "#FFC285",
  },
});
