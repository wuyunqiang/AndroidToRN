/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
    DeviceEventEmitter
} from 'react-native';
import './RN_src/utils'
import './RN_src/assets'
import AppNavigator from './RN_src/router'
import App from './RN_src/TestActivity'
AppRegistry.registerComponent('RNActivity', () => AppNavigator);

AppRegistry.registerComponent('TestActivity', () => App);