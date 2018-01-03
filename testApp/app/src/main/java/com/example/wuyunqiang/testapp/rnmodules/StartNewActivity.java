package com.example.wuyunqiang.testapp.rnmodules;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.example.wuyunqiang.testapp.H5Activity;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by wuyunqiang on 2018/1/2.
 */

public class StartNewActivity extends ReactContextBaseJavaModule {

    private Activity activity;

    public StartNewActivity(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "StartNewActivity";
    }

    @ReactMethod
    public void startH(final Promise promise) {
        activity = getCurrentActivity();
        if(activity==null){
            return;
        }
        Intent intent = new Intent(activity, H5Activity.class);
        activity.startActivity(intent);
    }
}
