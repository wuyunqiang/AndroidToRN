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
var ModalView = requireNativeComponent('ModalAndroid', App);//内部使用popwindow实现全屏
export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <ModalView
                ref = {(PopModal)=>{this.PopModal = PopModal}}
                {...this.props}>
                <View style={{flex: 1}}>
                    {this.props.children}
                </View>
            </ModalView>
        )
    }
}

ModalView.propTypes = {
    ...View.propTypes,
    visible:PropTypes.bool,
};