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
import { StackNavigator,TabNavigator,NavigationActions } from 'react-navigation';
import Tab from './component/Tab'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import One from './One'
import Two from './Two'
import Three from './Three'
import Four from './Four'
import SGList from './list/SGList/SGListPage'
import LargeListPage from './list/LargeListPage';
const Routes = {
    One:{screen: One},
    Two:{screen: Two},
    Three:{screen: Three},
    Four:{screen:Four},
    LargeListPage:{screen:LargeListPage},
    SGList:{screen:SGList}
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
        swipeEnabled: true,
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

const StackOptions = ({navigation}) => {
    const gesturesEnabled = true;
    const headerStyle= {
        height:Platform.OS==='ios'?SCALE(110):SCALE(110)-20,
        backgroundColor: Color.C5995f5,
        borderWidth:0,
        borderBottomWidth:0,
    };
    const headerTitleStyle = {
        fontSize: FONT(17),
        color: 'white',
        alignSelf: 'center'
    };
    const headerTintColor= 'white';
    const headerLeft = (
        <TouchableOpacity activeOpacity={1} onPress={()=>{navigation.goBack(null)}}>
            <View style={{paddingLeft:SCALE(30),paddingRight:SCALE(40)}}>
                <Image
                    source={AppImages.Home.back}
                    style={{width:SCALE(20),height:SCALE(37)}}/>
            </View>
        </TouchableOpacity>
    );
    const headerRight=(<View style={{paddingRight:SCALE(30)}}>
    </View>);
    return {headerLeft,headerRight,headerStyle,gesturesEnabled,headerTitleStyle,headerTintColor,}
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
        navigationOptions: ({navigation}) => StackOptions({navigation}),
    }
);

// 主要是这一步
const navigateOnce = (getStateForAction) => (action, state) => {
    console.log('执行了这里跳转页面')
    const {type, routeName} = action
    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state)
}

// 这是第二步
AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction)

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

export default ()=><AppNavigator onNavigationStateChange={(prevState, currentState) => {
    const currentScreen = getCurrentRouteName(currentState);
    const prevScreen = getCurrentRouteName(prevState);
    if(currentScreen==='Two'){//监听页面跳转 符合要求可以发送监听
        console.log('页面跳转')
        DeviceEventEmitter.emit('Two', 'Two');
    }
}}/>;
