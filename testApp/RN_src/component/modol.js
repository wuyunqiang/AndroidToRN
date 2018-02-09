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
    UIManager,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter,
    requireNativeComponent,
} from 'react-native';
const ReactNative = require('ReactNative');
import PropTypes from 'prop-types';
var ModalView = requireNativeComponent('ModalView', App);
export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <ModalView {...this.props}>
                <View style={{flex: 1}}>
                    {this.props.children}
                </View>
            </ModalView>
        )
    }
}

ModalView.propTypes = {
    ...View.propTypes,
    animationType:PropTypes.string,
    transparent:PropTypes.string,//必须 否则监听回调可能无法被调用
    onRequestClose:PropTypes.func,//网络请求加载数据
    onShow:PropTypes.func,
};