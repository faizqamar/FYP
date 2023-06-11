import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {LargeText} from './texts';
import {COLORS} from '../constants/theme';

const CallToAction = ({title = 'button', onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <LargeText style={styles.text}>{title}</LargeText>
    </TouchableOpacity>
  );
};

export default CallToAction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    minWidth: 120,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    color: COLORS.white,
  },
});
