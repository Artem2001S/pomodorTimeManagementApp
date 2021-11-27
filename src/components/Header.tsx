import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../styles/colors';
import ArrowBackIcon from './Icons/ArrowBackIcon';
import RhodiumText from './RhodiumText';

interface HeaderProps {
  title: string;
  rootStyle?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({title, rootStyle}) => {
  const nav = useNavigation();
  return (
    <View style={[styles.root, rootStyle]}>
      <TouchableOpacity style={styles.backBtn} onPress={nav.goBack}>
        <ArrowBackIcon />
      </TouchableOpacity>
      <RhodiumText numberOfLines={1} style={styles.title}>
        {title}
      </RhodiumText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingHorizontal: 10,

    width: '100%',
    alignItems: 'center',
    paddingTop: 14,
    backgroundColor: colors.tomato,
  },
  backBtn: {
    transform: [{scale: 0.8}],
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    flex: 1,
    fontSize: 26,
  },
});
