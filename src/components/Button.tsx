import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../styles/colors';
import RhodiumText from './RhodiumText';

interface ButtonProps {
  rootStyle?: StyleProp<ViewStyle>;
  type?: 'transparent' | 'white';
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  rootStyle,
  type,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.root,
        type === 'transparent' && styles.transparent,
        rootStyle,
      ]}>
      <RhodiumText
        style={[
          styles.title,
          type === 'transparent' && styles.transparentTitle,
        ]}>
        {children}
      </RhodiumText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: '100%',
    minHeight: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#F83535',
    fontSize: 25,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  transparentTitle: {
    color: colors.white,
  },
});

export default Button;
