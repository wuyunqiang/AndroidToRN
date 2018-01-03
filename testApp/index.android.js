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
import AppNavigator from './router'
AppRegistry.registerComponent('RNActivity', () => AppNavigator);

