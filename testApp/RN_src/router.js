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
import { enhance } from 'react-navigation-addons';
import Tab from './component/Tab'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import One from './page/One'
import Two from './page/Two'
import Three from './page/Three'
import Four from './list/FlatPage'
import SGList from './list/SGList/SGListPage'
import LargeListPage from './list/LargeListPage';
import WaterFallPage from './page/WaterFallPage'
import GesturePage from './page/GesturePage'
const Routes = {
    One:{screen: One},
    Two:{screen: Two},
    Three:{screen: Three},
    Four:{screen:Four},
    LargeListPage:{screen:LargeListPage},
    SGList:{screen:SGList},
    WaterFallPage:{screen:WaterFallPage},
    GesturePage:{screen:GesturePage},
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

const Index = TabNavigator(
    {
        One:{screen: One},
        Two:{screen: Two},
        Three:{screen: Three},
    },
    {
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
        height:SCALE(80),
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
        <TouchableOpacity activeOpacity={1} onPress={()=>{
            console.log('配置里面的navigation goback');
            navigation.goBack(null)
        }}>
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
            screen: Index,
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

export default AppNavigator;
