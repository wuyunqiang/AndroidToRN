package com.example.wuyunqiang.testapp.rnview;

import android.util.Log;
import android.view.View;

import com.example.wuyunqiang.testapp.view.Header;
import com.example.wuyunqiang.testapp.view.PopModal;
import com.example.wuyunqiang.testapp.view.SmartRefreshLayout;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.listener.OnRefreshListener;

import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by wuyunqiang on 2018/1/16.
 */

public class Modal extends ViewGroupManager<PopModal> {

    static final String TAG = "Modal";
    Header header;
    static final int FinishRefresh = 1;
    String Key;
    boolean CanRefresh = true;

    @Override
    public String getName() {
        return "PullLayout";
    }

    @Override
    protected PopModal createViewInstance(ThemedReactContext reactContext) {
        PopModal modal= new PopModal(reactContext);
        return modal;
    }


    @Override
    public void onDropViewInstance(PopModal view) {
//        view.removeAllViews();//
        super.onDropViewInstance(view);
    }

    @Override
    public void addView(PopModal parent, View child, int index) {
        super.addView(parent, child, index);
    }

    //发送给RN刷新事件 加载数据
    public void refresh(ThemedReactContext reactContext,PopModal refreshlayout){
        if(reactContext!=null){
            WritableMap params = Arguments.createMap();
            params.putString("from","native");
            Log.i(TAG,"开始刷新");
            if(CanRefresh){
                CanRefresh = false;
                this.dispatchEvent(reactContext,refreshlayout,"onRefreshReleased",params);
            }

        }
    }

    public void dispatchEvent(final ReactContext reactContext,
                              final PopModal refreshlayout,
                              final String eventName,
                               @android.support.annotation.Nullable final WritableMap params) {
        if (reactContext==null) {
            Log.i(TAG, "reactContext==null");
        }else{
            Log.i(TAG, "发送消息事件 " +"refreshlayout View id : " + refreshlayout.getId());
            Log.i(TAG, "key:" + this.Key+eventName);
//            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
//                    refreshlayout.getId(),//实例的ID native和js两个视图会依据getId()而关联在一起
//                    eventName,//事件名称
//                    params
//            );
            //原生模块发送事件
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(this.Key+eventName, params);
        }
    }


    @Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        //第一个Login 注册的名字  第二个registrationName不可以改变 第三个js回调方法
        return MapBuilder.<String, Object>builder()
                .put("onRefreshReleased", MapBuilder.of("registrationName", "onRefreshReleased"))
                .build();
    }


    @Override
    protected void addEventEmitters(final ThemedReactContext reactContext, final PopModal view) {
        super.addEventEmitters(reactContext, view);
    }


    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("FinishRefresh",FinishRefresh);
    }

    @Override
    public void receiveCommand(PopModal root, int commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        Log.i(TAG,args.getString(0));
        String key = args.getString(0);
        switch (commandId){
            case FinishRefresh:
                if(this.Key.equals(key)){
                    Log.i(TAG,"结束刷新");
                    CanRefresh = true;
                }
                return;
        }
    }
}
