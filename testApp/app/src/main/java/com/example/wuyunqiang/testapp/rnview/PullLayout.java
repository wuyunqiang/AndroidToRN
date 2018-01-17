package com.example.wuyunqiang.testapp.rnview;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;

import com.example.wuyunqiang.testapp.R;
import com.example.wuyunqiang.testapp.view.Header;
import com.example.wuyunqiang.testapp.view.SmartRefreshLayout;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.footer.ClassicsFooter;
import com.scwang.smartrefresh.layout.listener.OnRefreshListener;

import java.util.Map;

/**
 * Created by wuyunqiang on 2018/1/16.
 */

public class PullLayout extends ViewGroupManager<SmartRefreshLayout> {

    static final String TAG = "HeaderLayout";
    boolean finishRefresh = true;

    @Override
    public String getName() {
        return "PullLayout";
    }

    @Override
    protected SmartRefreshLayout createViewInstance(ThemedReactContext reactContext) {
        SmartRefreshLayout  refreshLayout = (SmartRefreshLayout) LayoutInflater.from(reactContext).inflate(R.layout.activity_pull,null);

//        refreshLayout.setOnLoadmoreListener(new OnLoadmoreListener() {
//            @Override
//            public void onLoadmore(com.scwang.smartrefresh.layout.api.RefreshLayout refreshlayout) {
//                refreshlayout.finishLoadmore(false/*,false*/);//传入false表示加载失败
//            }
//        });

//        refreshLayout.setOnRefreshListener(new OnRefreshListener() {
//            @Override
//            public void onRefresh(com.scwang.smartrefresh.layout.api.RefreshLayout refreshlayout) {
//                refreshlayout.finishRefresh(2000);//传入false表示刷新失败
//            }
//        });
        refreshLayout.setEnableLoadmoreWhenContentNotFull(false);
        refreshLayout.setRefreshHeader(new Header(reactContext));

        refreshLayout.setRefreshFooter(new ClassicsFooter(reactContext));
        refreshLayout.setEnableLoadmore(false);//是否启用上拉加载功能
        refreshLayout.setReboundDuration(400);//回弹动画时长（毫秒）
        refreshLayout.setHeaderTriggerRate(1.2f);//触发刷新距离 与 HeaderHieght 的比率1.0.4
        return refreshLayout;
    }

    @Override
    public void addView(SmartRefreshLayout parent, View child, int index) {
        super.addView(parent, child, index);
        parent.onFinishInflate();
    }

    //index 0刷新开始 1刷新结束
    public void refresh(ThemedReactContext reactContext,SmartRefreshLayout refreshlayout){

        if(reactContext!=null){
            WritableMap params = Arguments.createMap();
            params.putString("from","native");
            Log.i(TAG,"开始刷新");
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                    refreshlayout.getId(),//实例的ID native和js两个视图会依据getId()而关联在一起
                    "onRefreshReleased",//事件名称
                    params
            );
//            reactContext
//                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                    .emit("onRefreshReleased", params);
        }else{
            Log.i(TAG,"刷新结束");
            refreshlayout.finishRefresh();
        }
    }


    @javax.annotation.Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        //第一个Login 注册的名字  第二个registrationName不可以改变 第三个js回调方法
        return MapBuilder.<String, Object>builder()
                .put("onRefreshReleased", MapBuilder.of("registrationName", "onRefreshReleased"))
                .build();
    }

    @Override
    protected void addEventEmitters(final ThemedReactContext reactContext, final SmartRefreshLayout view) {
        super.addEventEmitters(reactContext, view);
        view.setOnRefreshListener(new OnRefreshListener() {
            @Override
            public void onRefresh(RefreshLayout refreshlayout) {
                refresh(reactContext,view);
            }
        });
    }

    @ReactProp(name = "finishRefresh")
    public void finishRefresh(final SmartRefreshLayout refreshLayout,final boolean finishRefresh) {
        Log.i(TAG,"finishRefresh:"+finishRefresh);
        if(this.finishRefresh!=finishRefresh){
            this.finishRefresh = finishRefresh;
            refresh(null,refreshLayout);

        }
    }
}
