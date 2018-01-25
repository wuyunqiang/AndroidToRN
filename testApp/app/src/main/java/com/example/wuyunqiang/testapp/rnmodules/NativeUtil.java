package com.example.wuyunqiang.testapp.rnmodules;

import android.app.Activity;
import android.content.Intent;

import com.example.wuyunqiang.testapp.R;
import com.example.wuyunqiang.testapp.activity.OtherActivity;
import com.example.wuyunqiang.testapp.activity.TestActivity;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by wuyunqiang on 2018/1/2.
 */

public class NativeUtil extends ReactContextBaseJavaModule {

    private Activity activity;

    public NativeUtil(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeUtil";
    }

    @ReactMethod
    public void Finish(final Promise promise) {
        activity = getCurrentActivity();
        if(activity==null){
            return;
        }
        activity.finish();
        activity.overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_left);
    }

    @ReactMethod
    public void startActivity(final Promise promise) {
        activity = getCurrentActivity();
        if(activity==null){
            return;
        }
        Intent intent = new Intent(activity, OtherActivity.class);
        activity.startActivity(intent);
        activity.overridePendingTransition(R.anim.slide_in_right,R.anim.slide_out_right);
    }
}
