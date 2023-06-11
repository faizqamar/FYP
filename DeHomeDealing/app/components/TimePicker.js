import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import { TouchableOpacity } from "react-native";
import { getTime } from "../global/functions";
import colors from "../config/colors";
import { FONTS } from "../constants/theme";

const TimePicker = ({ onSelectTime, selectedTime }) => {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("time");
  const [show, setShow] = React.useState(false);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    onSelectTime(currentDate);
    console.log("Current Time", currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <TouchableOpacity onPress={showTimepicker} style={styles.innerContainer}>
        {selectedTime ? (
          <Text onPress={showTimepicker}>
            Time Selected: {getTime(selectedTime)}
          </Text>
        ) : (
          <Text>Selected Time</Text>
        )}
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}
    </View>
  );
};

// const [myDrivers, setMyDrivers] = React.useState([])

export default TimePicker;

const styles = StyleSheet.create({
  innerContainer: {
    padding: 15,
    backgroundColor: colors.white,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.light,
  },
  text: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: colors.medium,
    flex: 1,
  },
});
