/**
 * Created by wuyunqiang on 2018/1/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter,
    requireNativeComponent
} from 'react-native';
import PropTypes from 'prop-types';
var PullLayout = requireNativeComponent('PullLayout', App);
export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <PullLayout
                ref={(c) => {this.pullLayout = c;}}
                style={[{flex: 1,backgroundColor:'white',},this.props.style]}
                {...this.props}
            >
                <View style={{flex: 1}}>
                    {this.props.children}
                </View>
            </PullLayout>
        )
    }
}

PullLayout.propTypes = {
    ...View.propTypes,
    finishRefresh:PropTypes.bool,//刷新完成 还原界面 只有属性值变化了原生界面才会更新 所以这里一定要变化
    onRefreshReleased:PropTypes.func,//网络请求加载数据
};