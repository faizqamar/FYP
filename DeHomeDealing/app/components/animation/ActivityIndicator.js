import React from 'react';
import {View} from 'react-native';

import LottieView from 'lottie-react-native';
const ActivityIndicator = ({visible = false}) => {
  if (!visible) {
    return null;
  }
  return (
    <View style={{flex: 1}}>
      <LottieView
        source={require('../../animations/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default ActivityIndicator;
