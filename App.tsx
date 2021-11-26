import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/components/RootNavigation';
import AppContextProvider from './src/contexts/AppContext';

const App = () => {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <RootNavigation />
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default App;
