import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
const windowWidth = Dimensions.get("window").width;

const InputDate = ({ retData, label }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [CDate, setCDate] = useState(new Date());

  const onChangeFromData = (event, selectedValue) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || date;
      setCDate(currentDate);
      retData(currentDate);
    } else {
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };
  return (
    <>
      <Text style={styles.inputLabelTxt}>{label}</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.TextInput}>
        <View style={styles.inputField}>
          <Text>{CDate === "" ? "CDate.." : CDate.toLocaleDateString()}</Text>
          <Icon
            name="calendar"
            color={secodaryCardColor}
            type="entypo"
            size={20}
          ></Icon>
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          // timeZoneOffsetInMinutes={0}
          value={CDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeFromData}
          // minimumDate={new Date()}
        />
      )}
    </>
  );
};

export default InputDate;

const styles = StyleSheet.create({
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
});
