import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppContext} from '../contexts/AppContext';
import {colors} from '../styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/RootNavigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StatisticsIcon from '../components/Icons/StatisticsIcon';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import SettingsIcon from '../components/Icons/SettingsIcon';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainScreen: React.FC<MainScreenProps> = ({navigation}) => {
  const state = useAppContext();
  const {top, bottom} = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.root]}>
        <View style={styles.top}>
          <View style={[styles.circle]} />
          <TouchableOpacity>
            <StatisticsIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsBtn}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.tomato}>
            <View style={styles.tomatoGreenContainer}>
              <Image
                source={require('../assets/green.png')}
                style={styles.tomatoGreenImg}
              />
            </View>
            <View style={styles.tomatoShadow} />
            <View style={styles.circleTomato}></View>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Policy')}
        style={[styles.policyBtn, {bottom: 10 + bottom}]}>
        <Text style={styles.policyText}>Политика конфиденциальности</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');

const TOMATO_SIZE = width * 0.75;
const TOMATO_GREEN_SIZE = TOMATO_SIZE * 0.7;
// const PADDING_HORIZONTAL =
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.tomato,
    overflow: 'hidden',
  },
  tomatoShadow: {
    position: 'absolute',
    zIndex: 0,
    bottom: 0,
    left: TOMATO_SIZE / 2,
    transform: [{rotate: '45deg'}, {translateY: (TOMATO_SIZE - 30) / 1.5}],

    backgroundColor: '#960202',
    height: TOMATO_SIZE - 30,
    width: TOMATO_SIZE * 1.8,
  },
  tomatoGreenContainer: {
    marginBottom: -30,
    zIndex: 2,
    alignItems: 'center',
  },
  safeArea: {
    // backgroundColor: colors.tomato,
    flex: 1,
  },
  tomatoGreenImg: {
    width: TOMATO_GREEN_SIZE,
    height: TOMATO_GREEN_SIZE / 2,
    resizeMode: 'contain',
  },
  circleTomato: {
    backgroundColor: '#CD2020',
    borderRadius: TOMATO_SIZE,
    borderWidth: 10,
    borderColor: colors.white,
    width: TOMATO_SIZE,
    height: TOMATO_SIZE,
  },
  policyText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tomato: {},
  policyBtn: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  circle: {
    width: 198,
    height: 198,
    backgroundColor: colors.white,
    borderRadius: 2222,
    position: 'absolute',

    right: -100,
    top: -100,
  },
  settingsBtn: {
    backgroundColor: colors.white,
  },
  top: {
    width: '100%',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default MainScreen;
