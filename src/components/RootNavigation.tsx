import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MainScreen from '../screens/MainScreen';

type RootStackParamList = {
  Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        options={{headerShown: false}}
        component={MainScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
