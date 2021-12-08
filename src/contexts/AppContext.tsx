import dayjs from 'dayjs';
import React, {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from 'react';
import PushNotification from 'react-native-push-notification';
import {PUSH_TITLE} from '../constants';
import useInterval from '../hooks/useInterval';
import {
  addCompletedTaskToStorage,
  getBreakMinutes,
  getVibrationEnabled,
  getWorkMinutes,
} from '../storage/storage';
import {showPush} from '../utils/notifications';

const defaultState: AppState = {
  settings: {
    tomatoDurationsInMin: 25,
    breakDurationInMin: 5,
  },
  setSettings: () => {},
  isTimerActive: false,
  setIsTimerActive: () => {},
  secondsPassed: 0,
  setSecondsPassed: () => {},
  currentTimerType: 'work',
  setCurrentTimerType: () => {},
  stopTimer: () => {},
  startTimer: () => {},
  isTimerStopped: false,
  secondsNeedToBeDone: 0,
  setSecondsNeedToBeDone: () => {},
  calculateSecondsNeedToBeDone: () => {
    return 0;
  },
  cancelTimer: () => {},
  skipBreak: () => {},
  vibrationEnabled: true,
  setVibrationEnabled: () => {},

  timerStartTimeStamp: undefined,
  setTimerStartTimeStamp: () => {},
};

const AppContext = createContext<AppState>(defaultState);

export interface Settings {
  tomatoDurationsInMin: number;
  breakDurationInMin: number;
}

export interface AppState {
  settings: Settings;
  vibrationEnabled?: boolean;
  setSettings: (settings: Settings) => void;
  isTimerActive: boolean;
  setIsTimerActive: (isTimerActive: boolean) => void;
  secondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  currentTimerType: 'work' | 'break';
  setCurrentTimerType: (type: 'work' | 'break') => void;
  secondsNeedToBeDone: number;
  setSecondsNeedToBeDone: (seconds: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  isTimerStopped: boolean;
  calculateSecondsNeedToBeDone: () => number;
  skipBreak: () => void;
  setVibrationEnabled: (enabled: boolean) => void;
  cancelTimer: () => void;

  timerStartTimeStamp: number | undefined;
  setTimerStartTimeStamp: (minutes: number) => void;
}

const AppContextProvider: React.FC = ({children}) => {
  const [settings, setSettings] = useState<Settings>({
    tomatoDurationsInMin: 25,
    breakDurationInMin: 5,
  });

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [secondsPassed, setSecondsPassed] = useState<number>(0);
  const [currentTimerType, setCurrentTimerType] = useState<'work' | 'break'>(
    'work',
  );
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const [timerStartTimeStamp, setTimerStartTimeStamp] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    const init = async () => {
      const breakMinutes = await getBreakMinutes();
      const workMinutes = await getWorkMinutes();
      const vibrationEnabled_ = await getVibrationEnabled();

      if (breakMinutes || workMinutes) {
        setSettings({
          breakDurationInMin: Number(breakMinutes) || 5,
          tomatoDurationsInMin: Number(workMinutes) || 25,
        });
        vibrationEnabled_ !== null &&
          setVibrationEnabled(vibrationEnabled_ as boolean);
      }
    };
    init();
  }, []);

  const [secondsNeedToBeDone, setSecondsNeedToBeDone] = useState(0);
  const [isTimerStopped, setIsTimerStopped] = useState(false);

  const calculateSecondsNeedToBeDone = useCallback(() => {
    const minutes =
      currentTimerType === 'break'
        ? settings.breakDurationInMin
        : settings.tomatoDurationsInMin;

    let seconds = dayjs()
      .add(minutes * 60, 'seconds')
      .diff(dayjs(), 'seconds');
    const str = seconds.toString();

    // delay fix
    if (str[str.length - 1] !== '0') {
      seconds += 1;
    }
    return seconds;
  }, [
    currentTimerType,
    settings.breakDurationInMin,
    settings.tomatoDurationsInMin,
  ]);

  const startTimer = useCallback(() => {
    let pushTimestamp;
    if (isTimerStopped) {
      setIsTimerStopped(false);
      console.log('stopped');
      setTimerStartTimeStamp(dayjs().valueOf() - secondsPassed * 1000);
      pushTimestamp = dayjs()
        .add(secondsNeedToBeDone - secondsPassed, 'seconds')
        .valueOf();
    } else {
      const seconds = calculateSecondsNeedToBeDone();
      console.log('seconds', seconds);
      pushTimestamp = dayjs().add(seconds, 'seconds').valueOf();
      setSecondsNeedToBeDone(seconds);
      setIsTimerActive(true);
      setTimerStartTimeStamp(dayjs().valueOf());
    }

    if (currentTimerType === 'work') {
      showPush(
        {
          title: PUSH_TITLE,
          message: 'Время отдохнуть!',
        },
        pushTimestamp,
        vibrationEnabled,
      );
    } else {
      showPush(
        {
          title: PUSH_TITLE,
          message: 'Надеюсь успели отдохнуть! Продолжим работать ?',
        },
        pushTimestamp,
        vibrationEnabled,
      );
    }
  }, [
    calculateSecondsNeedToBeDone,
    currentTimerType,
    isTimerStopped,
    secondsNeedToBeDone,
    secondsPassed,
    vibrationEnabled,
  ]);

  const stopTimer = useCallback(() => {
    if (isTimerActive) {
      setIsTimerStopped(true);
      PushNotification.cancelAllLocalNotifications();

      setTimerStartTimeStamp(dayjs().valueOf());
    }
  }, [isTimerActive]);

  const cancelTimer = useCallback(() => {
    setIsTimerActive(false);
    setCurrentTimerType(currentTimerType);

    setTimerStartTimeStamp(undefined);
    PushNotification.cancelAllLocalNotifications();

    setIsTimerStopped(false);
    setSecondsNeedToBeDone(0);
    setSecondsPassed(0);
  }, [currentTimerType]);

  const skipBreak = useCallback(() => {
    cancelTimer();
    setCurrentTimerType('work');
  }, [cancelTimer]);

  useInterval(
    () => {
      const secondsPassed_ = dayjs().diff(
        dayjs(timerStartTimeStamp),
        'seconds',
      );
      setSecondsPassed(secondsPassed_);

      if (secondsPassed_ >= secondsNeedToBeDone) {
        // task completed
        setIsTimerActive(false);
        setSecondsPassed(0);
        setIsTimerStopped(false);
        setCurrentTimerType(currentTimerType === 'break' ? 'work' : 'break');

        if (currentTimerType === 'work') {
          addCompletedTaskToStorage(dayjs().toISOString());
        }
      }
    },
    isTimerActive && !isTimerStopped ? 999 : null,
  );

  return (
    <AppContext.Provider
      value={{
        settings,
        setSettings,
        isTimerActive,
        setIsTimerActive,
        secondsPassed,
        setSecondsPassed,
        currentTimerType,
        setCurrentTimerType,
        startTimer,
        secondsNeedToBeDone,
        setSecondsNeedToBeDone,
        calculateSecondsNeedToBeDone,
        stopTimer,
        isTimerStopped,
        skipBreak,
        vibrationEnabled,
        setVibrationEnabled,
        cancelTimer,
        timerStartTimeStamp,
        setTimerStartTimeStamp,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const state: AppState = useContext(AppContext);
  return state;
};

export default AppContextProvider;
