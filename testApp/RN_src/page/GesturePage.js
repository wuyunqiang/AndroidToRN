import React, { Component } from 'react';
import { Animated,Dimensions,Alert,Text,StyleSheet, View } from 'react-native';
import {
    PanGestureHandler,
    LongPressGestureHandler,
    ScrollView,
    State,
    TapGestureHandler,
} from 'react-native-gesture-handler';
import TapOrPan from '../gesture/TapOrPan'
import PressBox from '../gesture/PressBox'
import { LoremIpsum } from '../data/common';
import DraggableBox from '../gesture/draggable'

export default class Example extends Component {
    render() {
        return (
            <ScrollView
                id="scroll"
                waitFor={['tap', 'pan']}>
                <LoremIpsum words={40} />
                <PressBox />
                <LoremIpsum />
            </ScrollView>
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
