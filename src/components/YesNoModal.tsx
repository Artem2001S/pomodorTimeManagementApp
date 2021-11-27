import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import {colors} from '../styles/colors';
import Button from './Button';
import RhodiumText from './RhodiumText';

const {width, height} = Dimensions.get('window');

interface YesNoModalProps {
  title: string;
  onConfirm?: () => void;
  onDismiss?: () => void;
}

const YesNoModal: React.FC<YesNoModalProps> = ({
  title,
  onDismiss,
  onConfirm,
}) => {
  return (
    <View style={styles.root}>
      <Animated.View
        entering={FadeInDown.duration(400)}
        exiting={FadeOutUp.duration(300)}
        style={styles.modalRoot}>
        <View style={styles.top}>
          <RhodiumText style={styles.title}>{title}</RhodiumText>
        </View>
        <View style={styles.bottom}>
          <Button rootStyle={styles.btn} onPress={onConfirm}>
            Да
          </Button>
          <Button rootStyle={styles.btn} onPress={onDismiss}>
            Нет
          </Button>
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    top: 0,
    left: 0,
    width,
    height,
    position: 'absolute',
    zIndex: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: width * 0.3,
  },
  top: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    flex: 3,
    fontSize: 30,
    lineHeight: 60,
    width: '100%',
  },
  modalRoot: {
    paddingVertical: 16,
    paddingHorizontal: 20,

    width: width * 0.8,
    borderWidth: 6,
    borderRadius: 15,
    borderColor: colors.white,
    backgroundColor: colors.tomato,
    minHeight: height * 0.36,
  },
});

export default YesNoModal;
