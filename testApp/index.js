/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
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
import Root from './RN_src/root'
import Test from './RN_src/page/TestActivity'
AppRegistry.registerComponent('RNActivity', () => Root);

AppRegistry.registerComponent('TestActivity', () => Test);