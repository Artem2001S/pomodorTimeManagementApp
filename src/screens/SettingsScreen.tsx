import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import RhodiumText from '../components/RhodiumText';
import {Settings, useAppContext} from '../contexts/AppContext';
import {colors} from '../styles/colors';
import {Slider} from '@miblanchard/react-native-slider';

const SettingsScreen: React.FC = () => {
  const {settings, setSettings} = useAppContext();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <Header title="НАСТРОЙКИ" />
        <RhodiumText style={[styles.title, styles.first]}>
          Длительность помидора:
        </RhodiumText>
        <Slider
          value={settings.tomatoDurationsInMin}
          containerStyle={styles.slider}
          minimumTrackTintColor="white"
          maximumTrackTintColor="#B7B7B7"
          thumbTintColor="white"
          step={1}
          thumbStyle={styles.thumb}
          onValueChange={value => {
            const settings_: Settings = {
              ...settings,
              tomatoDurationsInMin: value as number,
            };
            setSettings(settings_);
          }}
          minimumValue={10}
          maximumValue={60}
        />
        <RhodiumText style={[styles.title]}>
          {settings.tomatoDurationsInMin} минут
        </RhodiumText>
        <RhodiumText style={[styles.title, styles.second]}>
          Время перерыва:
        </RhodiumText>
        <Slider
          value={settings.breakDurationInMin}
          containerStyle={styles.slider}
          minimumTrackTintColor="white"
          maximumTrackTintColor="#B7B7B7"
          thumbTintColor="white"
          step={1}
          thumbStyle={styles.thumb}
          onValueChange={value => {
            const settings_: Settings = {
              ...settings,
              breakDurationInMin: value as number,
            };
            setSettings(settings_);
          }}
          minimumValue={1}
          maximumValue={10}
        />
        <RhodiumText style={styles.title}>
          {settings.breakDurationInMin} минут
        </RhodiumText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.tomato,
  },
  first: {
    marginTop: 40,
  },
  second: {
    marginTop: 30,
  },
  thumb: {
    width: 11,
    height: 11,
  },
  slider: {
    width: '70%',
    alignItems: 'stretch',

    alignSelf: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 28,
    color: colors.white,
  },
});

export default SettingsScreen;
