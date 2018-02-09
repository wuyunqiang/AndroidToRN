/**
 * Created by wuyunqiang on 2018/2/6.
 */
import React, { Component } from 'react';
import { Animated,Dimensions,Alert,Text,StyleSheet, View } from 'react-native';
import {
    PanGestureHandler,
    LongPressGestureHandler,
    ScrollView,
    State,
    TapGestureHandler,
} from 'react-native-gesture-handler';

export default class PressBox extends Component {
    _onHandlerStateChange = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            Alert.alert("I'm being pressed for so long");
        }
    };
    _onSingleTap = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            Alert.alert("I'm touched");
        }
    };
    _onDoubleTap = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            Alert.alert('D0able tap, good job!');
        }
    };
    render() {
        return (
            <LongPressGestureHandler
                id="long_tap"
                onHandlerStateChange={this._onHandlerStateChange}
                minDurationMs={800}>
                <TapGestureHandler
                    id="tap"
                    onHandlerStateChange={this._onSingleTap}
                    waitFor="double_tap">
                    <TapGestureHandler
                        id="double_tap"
                        onHandlerStateChange={this._onDoubleTap}
                        numberOfTaps={2}>
                        <View style={styles.box} />
                    </TapGestureHandler>
                </TapGestureHandler>
            </LongPressGestureHandler>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    box: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        backgroundColor: 'plum',
        margin: 10,
        zIndex: 200,
    },
});