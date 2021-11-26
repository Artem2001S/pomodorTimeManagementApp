import React, {useState, useContext, createContext} from 'react';

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
};

const AppContext = createContext<AppState>(defaultState);

export interface Settings {
  tomatoDurationsInMin: number;
  breakDurationInMin: number;
}

export interface AppState {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  isTimerActive: boolean;
  setIsTimerActive: (isTimerActive: boolean) => void;
  secondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
}

const AppContextProvider: React.FC = ({children}) => {
  const [settings, setSettings] = useState<Settings>({
    tomatoDurationsInMin: 25,
    breakDurationInMin: 5,
  });
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [secondsPassed, setSecondsPassed] = useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        settings,
        setSettings,
        isTimerActive,
        setIsTimerActive,
        secondsPassed,
        setSecondsPassed,
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
