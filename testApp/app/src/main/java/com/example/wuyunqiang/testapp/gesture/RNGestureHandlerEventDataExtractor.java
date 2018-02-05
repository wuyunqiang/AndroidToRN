package com.example.wuyunqiang.testapp.gesture;

import com.example.wuyunqiang.testapp.gesturehandler.GestureHandler;
import com.facebook.react.bridge.WritableMap;

public interface RNGestureHandlerEventDataExtractor<T extends GestureHandler> {
  void extractEventData(T handler, WritableMap eventData);
}
