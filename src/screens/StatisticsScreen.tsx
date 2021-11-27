/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import RhodiumText from '../components/RhodiumText';
import {colors} from '../styles/colors';

const Section: React.FC<{title: string; dark?: boolean; value: number}> = ({
  title,
  value,
  dark,
}) => {
  return (
    <View style={[styles.section, dark && styles.dark]}>
      <RhodiumText style={styles.sectionTitle}>{title}</RhodiumText>
      <RhodiumText style={styles.sectionTitle}>{value}</RhodiumText>
    </View>
  );
};

const StatisticsScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <Header title="СТАТИСТИКА" />
        <View style={styles.body}>
          <View style={styles.top}>
            <Section title="Сегодня" value={6} />
            <Section title="Вчера" value={6} />
            <Section title="За неделю" value={6} />
          </View>
          <View style={styles.bottom}>
            <Section dark title="Всего" value={6} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.tomato,
  },
  dark: {
    backgroundColor: '#AB1515',
  },
  section: {
    width: '100%',
    height: 80,
    backgroundColor: '#C03636',
    marginBottom: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 25,
  },
  body: {
    paddingHorizontal: 20,
    flex: 1,
  },
  top: {
    flex: 1,
    paddingTop: 40,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default StatisticsScreen;
