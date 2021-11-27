import React from 'react';
import {StyleSheet, Text, TextProps, View} from 'react-native';

const RhodiumText: React.FC<TextProps> = ({children, ...props}) => {
  return <Text {...props}>{children}</Text>;
};

const styles = StyleSheet.create({});
export default RhodiumText;
