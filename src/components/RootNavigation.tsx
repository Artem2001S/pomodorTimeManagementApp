import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MainScreen from '../screens/MainScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolictyScreen';

export type RootStackParamList = {
  Main: undefined;
  Policy: undefined;
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
      <RootStack.Screen
        name="Policy"
        options={{headerShown: true}}
        component={PrivacyPolicyScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
