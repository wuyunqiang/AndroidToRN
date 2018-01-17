package com.example.wuyunqiang.testapp.rnview;

import com.example.wuyunqiang.testapp.view.Header;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import java.util.Map;

/**
 * Created by wuyunqiang on 2018/1/17.
 */

public class HeaderLayout extends ViewGroupManager<Header> {


    Header header;

    @Override
    public String getName() {
        return "HeaderLayout";
    }

    @Override
    protected Header createViewInstance(ThemedReactContext reactContext) {
         header = new Header(reactContext);
        return header;
    }

//    @Override
//    protected void addEventEmitters(ThemedReactContext reactContext, Header view) {
//        super.addEventEmitters(reactContext, view);
//        WritableMap params = Arguments.createMap();
//        params.putString("from","native");
//        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
//                this.header.getId(),//实例的ID native和js两个视图会依据getId()而关联在一起
//                "onRefreshReleased",//事件名称
//                params);
//    }




}
