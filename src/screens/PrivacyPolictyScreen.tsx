/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {POLICY_URL} from '../constants';

const PrivacyPolicyScreen = () => {
  return (
    <View style={[styles.root]}>
      <WebView
        source={{uri: POLICY_URL}}
        startInLoadingState
        renderLoading={() => (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              top: 0,
              height: Dimensions.get('screen').height - 120,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color="tomato" size="large" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default PrivacyPolicyScreen;
