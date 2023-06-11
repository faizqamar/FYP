import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../constants/theme';

const TabButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Icon name="plus" size={35} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  tabButton: {
    padding: 15,
    borderRadius: 25,
    marginTop: -25,
    backgroundColor: COLORS.primary,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
