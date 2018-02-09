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
const circleRadius = 30;
const USE_NATIVE_DRIVER={
    USE_NATIVE_DRIVER: true,
};
export default class TapOrPan extends Component {
    constructor(props) {
        super(props);
        this._touchX = new Animated.Value(WIDTH / 2 - circleRadius);
        this._translateX = Animated.add(
            this._touchX,
            new Animated.Value(-circleRadius)
        );
        this._onPanGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        x: this._touchX,
                    },
                },
            ],

        );
    }

    _onTapHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.oldState === State.ACTIVE) {
            // Once tap happened we set the position of the circle under the tapped spot
            this._touchX.setValue(nativeEvent.x);
        }
    };

    render() {
        return (
            <TapGestureHandler
                id="tap"
                waitFor="pan"
                onHandlerStateChange={this._onTapHandlerStateChange}
                shouldCancelWhenOutside>
                <PanGestureHandler
                    id="pan"
                    minDeltaX={20}
                    onGestureEvent={this._onPanGestureEvent}
                    shouldCancelWhenOutside>
                    <View style={styles.horizontalPan}>
                        <Animated.View
                            style={[
                                styles.circle,
                                {
                                    transform: [
                                        {
                                            translateX: this._translateX,
                                        },
                                    ],
                                },
                            ]}
                        />
                    </View>
                </PanGestureHandler>
            </TapGestureHandler>
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
    horizontalPan: {
        backgroundColor: '#f48fb1',
        height: 150,
        justifyContent: 'center',
        marginVertical: 10,
    },
    circle: {
        backgroundColor: '#42a5f5',
        borderRadius: circleRadius,
        height: circleRadius * 2,
        width: circleRadius * 2,
    },
});