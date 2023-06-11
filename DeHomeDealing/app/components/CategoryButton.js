import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import ExtraLargeText from './texts/ExtraLargeText';
import {COLORS} from '../constants/theme';

const CategoryButton = ({onPress, style, textStyle, title = 'title'}) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={[styles.container, style]}>
      <ExtraLargeText style={[styles.text, textStyle]}>{title}</ExtraLargeText>
    </TouchableWithoutFeedback>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  container: {
    minWidth: 120,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
  },

  text: {
    fontSize: 18,
    color: COLORS.white,
  },
});
