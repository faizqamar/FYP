import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LargeText} from './texts';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import servicecolors from '../config/servicecolors';

const RatingContainer = ({rating = 5}) => {
  return (
    <View style={styles.ratingContainer}>
      <Icon name="star" size={30} color="yellow" style={{marginRight: 5}} />
      <LargeText>{rating}</LargeText>
    </View>
  );
};

export default RatingContainer;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    backgroundColor: servicecolors.four,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
