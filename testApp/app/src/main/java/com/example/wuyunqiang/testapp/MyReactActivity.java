package com.example.wuyunqiang.testapp;

import com.example.wuyunqiang.testapp.preloadreact.PreLoadReactActivity;

import javax.annotation.Nullable;

public class MyReactActivity extends PreLoadReactActivity {

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "RNActivity";
    }
}
