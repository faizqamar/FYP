import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import ErrorText from '../components/texts/ErrorText';

const ErrorMessage = ({error, visible}) => {
  if (!error || !visible) return null;
  return <ErrorText>{error}</ErrorText>;
};

export default ErrorMessage;

const styles = StyleSheet.create({});
