package com.example.wuyunqiang.testapp;

import com.example.wuyunqiang.testapp.preloadreact.PreLoadReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import javax.annotation.Nullable;

public class MyReactActivity extends PreLoadReactActivity {

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "RNActivity";
    }


}
