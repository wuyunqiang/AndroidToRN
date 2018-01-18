package com.example.wuyunqiang.testapp;

import com.example.wuyunqiang.testapp.rnmodules.StartNewActivity;
import com.example.wuyunqiang.testapp.rnview.PullLayout;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wuyunqiang on 2018/1/2.
 */

public class RNPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new StartNewActivity(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> views = new ArrayList<>();
        views.add(new PullLayout());
        return views;
    }
}
