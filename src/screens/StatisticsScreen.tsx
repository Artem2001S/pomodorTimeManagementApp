/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import RhodiumText from '../components/RhodiumText';
import {getCompletedTasksFromStorage} from '../storage/storage';
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
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  useEffect(() => {
    const init = async () => {
      setCompletedTasks((await getCompletedTasksFromStorage()) || []);
    };
    init();
  }, []);
  console.log(completedTasks);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <Header title="СТАТИСТИКА" />
        <View style={styles.body}>
          <View style={styles.top}>
            <Section
              title="Сегодня"
              value={
                completedTasks?.filter(
                  date => dayjs(date).diff(dayjs(), 'days') === 0,
                ).length
              }
            />
            <Section
              title="Вчера"
              value={
                completedTasks?.filter(
                  date => dayjs(date).diff(dayjs(), 'days') === -1,
                ).length
              }
            />
            <Section
              title="За неделю"
              value={
                completedTasks?.filter(
                  date => dayjs(date).diff(dayjs(), 'days') <= 6,
                ).length
              }
            />
          </View>
          <View style={styles.bottom}>
            <Section dark title="Всего" value={completedTasks.length} />
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
