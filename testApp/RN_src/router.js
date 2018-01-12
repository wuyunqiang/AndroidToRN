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
import Tab from './component/Tab'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import One from './One'
import Two from './Two'
import Three from './Three'
const Routes = {
    One:{screen: One},
    Two:{screen: Two},
};


const tabbaroption = {
    activeTintColor: Color.f3474b,
    inactiveTintColor: Color.C7b7b7b,
    showIcon: true,
    style: {
        backgroundColor:'white'
    },
    indicatorStyle: {
        opacity: 0
    },
    iconStyle:{
        paddingTop:0,
        padding:0,
        marginTop:0,
        width:SCALE(45),
        height:SCALE(45),
    },
    labelStyle:{
        marginTop:0,
        padding:0,
    },
    tabStyle: {
        height:Platform.OS==='ios'?SCALE(90):SCALE(100),
        alignItems:'center',
        justifyContent:'center',

    }
};

const ListIndex = TabNavigator(
    {
        One:{screen: One},
        Two:{screen: Two},
        Three:{screen: Three},
    },
    {
        lazy: true,
        swipeEnabled: false,
        tabBarComponent:props => <Tab {...props}/>,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: tabbaroption,
        headerLeft:null,
    });

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
            screen: ListIndex,
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
