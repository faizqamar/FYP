import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../config/colors";
import { getDate } from "../global/functions";
import { FONTS } from "../constants/theme";

const DatePicker = ({ onSelectDate, selectedDate }) => {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    onSelectDate(currentDate);
    console.log("heyyy my date", date);
  };

  const showMode = (currentMode) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      <View style={styles.innerContainer}>
        {selectedDate ? (
          <Text onPress={showDatepicker}>{getDate(selectedDate)}</Text>
        ) : (
          <Text onPress={showDatepicker}>Select Date</Text>
        )}
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

// const [myDrivers, setMyDrivers] = React.useState([])

export default DatePicker;

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
