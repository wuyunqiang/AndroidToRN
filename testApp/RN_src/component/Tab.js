/**
 * Created by wuyunqiang on 2018/1/12.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter
} from 'react-native';

export default class Tab extends Component {
    renderItem = (route, index) => {
        const {
            navigation,
            jumpToIndex,
        } = this.props;

        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused:focused,
            route:route,
            tintColor:color
        };

        if(index==1){
            return (<View
                    key={route.key}
                    style={[styles.tabItem,{backgroundColor:'transparent'}]}>
                    </View>
            );
        }

        return (
            <TouchableOpacity
                key={route.key}
                style={styles.tabItem}
                onPress={() => jumpToIndex(index)}
            >
                <View
                    style={styles.tabItem}>
                    {this.props.renderIcon(TabScene)}
                    <Text style={{ ...styles.tabText,marginTop:SCALE(10),color }}>{this.props.getLabel(TabScene)}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    render(){
        const {navigation,jumpToIndex} = this.props;
        const {routes,} = navigation.state;
        const focused = 1 === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused:focused,
            route:routes[1],
            tintColor:color
        };
        return (<View style={{width:WIDTH}}>
            <View style={styles.tab}>
                {routes && routes.map((route,index) => this.renderItem(route, index))}
            </View>
            <TouchableOpacity
                key={"centerView"}
                style={[styles.tabItem,{position:'absolute',bottom:0,left:(WIDTH-SCALE(100))/2,right:WIDTH-SCALE(100),height:SCALE(120)}]}
                onPress={() => jumpToIndex(1)}>
                <View
                    style={styles.tabItem}>
                    {this.props.renderIcon(TabScene)}
                    <Text style={{ ...styles.tabText,marginTop:SCALE(10),color }}>{this.props.getLabel(TabScene)}</Text>
                </View>
            </TouchableOpacity>
        </View>);
    }
}
const styles = {
    tab:{
        width:WIDTH,
        backgroundColor:'transparent',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end'
    },
    tabItem:{
        height:SCALE(80),
        width:SCALE(100),
        alignItems:'center',
        justifyContent:'center'
    },
    tabText:{
        marginTop:SCALE(13),
        fontSize:FONT(10),
        color:Color.C7b7b7b
    },
    tabTextChoose:{
        color:Color.f3474b
    },
    tabImage:{
        width:SCALE(42),
        height:SCALE(42),
    },
}