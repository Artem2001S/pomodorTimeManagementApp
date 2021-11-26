import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/components/RootNavigation';
import AppContextProvider from './src/contexts/AppContext';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="black"
        translucent={true}
      />
      <AppContextProvider>
        <RootNavigation />
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default App;
