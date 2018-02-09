import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import {
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
const USE_NATIVE_DRIVER={
    USE_NATIVE_DRIVER: true,
};

export default class DraggableBox extends Component {
  constructor(props) {
    super(props);
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            // translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  }
  _onHandlerStateChange = event => {
    console.log('_onHandlerStateChange oldState',event.nativeEvent);
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      // this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
    }
  };

    begin=(event)=>{
        console.log('onBegin event',event.nativeEvent);
    };

    failed =(event)=>{
        console.log('failed event',event.nativeEvent);
    }

    cancel = (event)=>{
        console.log('cancel event',event.nativeEvent);
    }

    activaty = (event)=>{
        console.log('activaty event',event.nativeEvent);
    }

    end = (event)=>{
        console.log('end event',event.nativeEvent);
    }

  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}
        onBegan ={this.begin}
        onFailed ={this.failed}
        onCancelled={this.cancel}
        onActivated={this.activaty}
        onEnded = {this.end}
        id="dragbox">
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                { translateX: this._translateX },
                { translateY: this._translateY },
              ],
            },
          ]}
        />
      </PanGestureHandler>
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
