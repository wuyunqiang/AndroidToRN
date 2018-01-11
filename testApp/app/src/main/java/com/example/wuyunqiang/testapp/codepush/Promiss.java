package com.example.wuyunqiang.testapp.codepush;

import android.util.Log;

import com.facebook.react.bridge.Promise;

import javax.annotation.Nullable;

/**
 * Created by wuyunqiang on 2018/1/9.
 */

public class Promiss implements Promise {

    public static String TAG = "CodePush";


    @Override
    public void resolve(@Nullable Object value) {
        Log.i(TAG,"resolve:");
    }

    @Override
    public void reject(String code, String message) {
        Log.i(TAG,"reject: "+message);

    }

    @Override
    public void reject(String code, Throwable e) {
        Log.i(TAG,"reject: "+e.getMessage());

    }

    @Override
    public void reject(String code, String message, Throwable e) {
        Log.i(TAG,"reject: "+"code："+code+" message："+message+" e："+e.getMessage());
    }

    @Override
    public void reject(String message) {
        Log.i(TAG,"reject: "+message);
    }

    @Override
    public void reject(Throwable reason) {
        Log.i(TAG,"reject: "+reason.getMessage());
    }
}
