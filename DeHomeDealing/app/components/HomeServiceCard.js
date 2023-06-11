import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import LargeText from '../components/texts/LargeText';
import servicecolors from '../config/servicecolors';

const HomeServiceCard = ({source, title = ''}) => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <Image source={source} style={styles.image} resizeMode="cover" />
      <LargeText style={styles.titleText}>{title}</LargeText>
    </TouchableOpacity>
  );
};

export default HomeServiceCard;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 7,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 27,
    backgroundColor: servicecolors.light,
  },
  image: {
    width: 225,
    height: 175,
  },
  titleText: {
    marginVertical: 3,
    color: servicecolors.font,
    fontSize: 20,
  },
});
