import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const NewRadioButton = ({
  onPressFirst,
  onPressSecond,
  titleFirst = 'First',
  titleSecond = 'Second',
}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onPressFirst}>{titleFirst}</TouchableOpacity>
      <TouchableOpacity onPress={onPressSecond}>{titleSecond}</TouchableOpacity>
    </View>
  );
};

export default NewRadioButton;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: 200,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 30,
  },
});
