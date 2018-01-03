package com.example.wuyunqiang.testapp;

import android.app.Application;
import android.util.Log;

import com.example.wuyunqiang.testapp.codepush.CodePush;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;


import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

/**
 * Created by wuyunqiang on 2017/12/25.
 */

public class MainApplication extends Application implements ReactApplication {

    public static String TAG = "MainApplication";
    private static MainApplication instance;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        Log.i(TAG,"onCreate");
        SoLoader.init(this,false);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Nullable
        @Override
        protected String getJSBundleFile() {
//            return CodePush.getJSBundleFile();
            return CodePush.getJSBundleFile("main.bundle");
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            Log.i(TAG,"getPackages");
            List<ReactPackage> modules = new ArrayList<>();
            modules.add(new MainReactPackage());
            modules.add(new RNPackage());
            modules.add( new CodePush("M9ezsCkj7OUhZcXONMg4accqVUu54ksvOXqog",
                    getApplicationContext(), BuildConfig.DEBUG,"http://172.28.110.180:3000/"));

            return modules;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        Log.i(TAG,"ReactNativeHost");
        return mReactNativeHost;
    }

    /**
     *包名
     */
    public String getAppPackageName() {
        return this.getPackageName();
    }

    /**
     * 获取Application实例
     */
    public static MainApplication getInstance() {
        return instance;
    }

}
