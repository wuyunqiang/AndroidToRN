/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    View,
    I18nManager,
    TouchableOpacity,
    Easing,
    StatusBar,
    Animated,
    DeviceEventEmitter,
    Image,
} from 'react-native';
import { StackNavigator,TabNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import One from './One'
import Two from './Two'
const Routes = {
    One:{screen: One},
    Two:{screen: Two},
};

//实现定义某个页面的动画效果
const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 300,
            easing: Easing.linear(),
            timing: Animated.timing,
        },
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
        // screenInterpolator:freeStyle,
    };
};



const AppNavigator = StackNavigator(
    {
        ...Routes,
        Index: {
            screen: One,
        },
    },
    {
        initialRouteName: 'Index',
        headerMode: 'screen',
        mode: 'card',
        transitionConfig: TransitionConfiguration,
    }
);

export default AppNavigator;
