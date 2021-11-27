import dayjs from 'dayjs';
import React, {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from 'react';
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

  useEffect(() => {
    const init = async () => {
      const breakMinutes = await getBreakMinutes();
      const workMinutes = await getWorkMinutes();
      const vibrationEnabled_ = await getVibrationEnabled();

      if (breakMinutes || workMinutes) {
        setSettings({
          breakDurationInMin: Number(breakMinutes) || 10,
          tomatoDurationsInMin: Number(workMinutes) || 25,
        });
        console.log('v', vibrationEnabled_);
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

    const doneDateTime = dayjs().add(minutes, 'minute');
    const seconds = doneDateTime.diff(dayjs(), 'seconds');
    return seconds;
  }, [
    currentTimerType,
    settings.breakDurationInMin,
    settings.tomatoDurationsInMin,
  ]);

  const startTimer = useCallback(() => {
    if (isTimerStopped) {
      setIsTimerStopped(false);
    } else {
      const seconds = calculateSecondsNeedToBeDone();
      setSecondsNeedToBeDone(seconds);
      setIsTimerActive(true);
    }
  }, [calculateSecondsNeedToBeDone, isTimerStopped]);

  const stopTimer = useCallback(() => {
    if (isTimerActive) {
      setIsTimerStopped(true);
    }
  }, [isTimerActive]);

  const cancelTimer = useCallback(() => {
    setIsTimerActive(false);
    setIsTimerStopped(false);
    setSecondsNeedToBeDone(0);
    setSecondsPassed(0);
  }, []);

  const skipBreak = useCallback(() => {
    cancelTimer();
    setCurrentTimerType('work');
  }, [cancelTimer]);

  useInterval(
    () => {
      const secondsPassed_ = secondsPassed + 1;
      setSecondsPassed(prev => prev + 1);
      if (secondsPassed_ === secondsNeedToBeDone) {
        // task completed
        setIsTimerActive(false);
        setSecondsPassed(0);
        setIsTimerStopped(false);
        setCurrentTimerType(currentTimerType === 'break' ? 'work' : 'break');

        if (currentTimerType === 'work') {
          showPush(
            {
              message: 'Время отдохнуть!',
            },
            vibrationEnabled,
          );
          addCompletedTaskToStorage(dayjs().toISOString());
        } else {
          showPush(
            {
              message: 'Надеюсь успели отдохнуть! Продолжим работать ?',
            },
            vibrationEnabled,
          );
        }
      }
    },
    isTimerActive && !isTimerStopped ? 950 : null,
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
