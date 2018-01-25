package com.example.wuyunqiang.testapp;

import com.example.wuyunqiang.testapp.rnmodules.NativeUtil;
import com.example.wuyunqiang.testapp.rnview.PullLayout;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wuyunqiang on 2018/1/2.
 */

public class RNPackage implements ReactPackage {

    @Override
    public List<com.facebook.react.bridge.NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<com.facebook.react.bridge.NativeModule> modules = new ArrayList<>();
        modules.add(new NativeUtil(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> views = new ArrayList<>();
        views.add(new PullLayout());
        return views;
    }
}
