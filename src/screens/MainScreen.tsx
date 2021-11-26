import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppContext} from '../contexts/AppContext';

const MainScreen = () => {
  const state = useAppContext();
  return <View style={styles.root}></View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default MainScreen;
