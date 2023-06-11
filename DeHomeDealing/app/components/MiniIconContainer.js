import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants/theme';

const MiniIconContainer = ({icon}) => {
  return (
    <TouchableOpacity style={{padding: 5, backgroundColor: COLORS.primary}}>
      <Icon name={icon} size={25} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default MiniIconContainer;

const styles = StyleSheet.create({});
