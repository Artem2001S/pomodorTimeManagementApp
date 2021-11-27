import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const RhodiumText: React.FC<TextProps> = ({children, ...props}) => {
  return (
    <Text {...props} style={[props.style, styles.default]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'RhodiumLibre-Regular',
  },
});

export default RhodiumText;
