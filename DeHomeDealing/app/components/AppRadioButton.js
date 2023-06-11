import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {MediumText} from './texts';
import {COLORS} from '../constants/theme';

const AppRadioButton = ({
  title = 'Button',
  onPress,
  color = COLORS.primary,
  textColor = COLORS.white,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: color}]}>
      <MediumText style={{color: textColor}}>{title}</MediumText>
    </TouchableOpacity>
  );
};

export default AppRadioButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    minWidth: 120,
  },
});
