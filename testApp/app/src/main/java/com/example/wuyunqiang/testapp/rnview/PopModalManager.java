package com.example.wuyunqiang.testapp.rnview;

import android.app.Activity;
import android.util.Log;
import android.view.ViewGroup;

import com.example.wuyunqiang.testapp.view.ModalHostShadowNode;
import com.example.wuyunqiang.testapp.view.PopModal;
import com.example.wuyunqiang.testapp.view.SmartRefreshLayout;
import com.facebook.common.activitylistener.ActivityListener;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.EventDispatcher;

import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by wuyunqiang on 2018/1/16.
 */

public class PopModalManager extends ViewGroupManager<PopModal> implements ActivityListener{

    static final String TAG = "ModalAndroid";
    static final int show = 1;
    static final int close = 2;

    @Override
    public String getName() {
        return "ModalAndroid";
    }

    @Override
    protected PopModal createViewInstance(ThemedReactContext reactContext) {
       final PopModal popModal = new PopModal(reactContext);
       return popModal;
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        return new ModalHostShadowNode();
    }

    @Override
    public Class<? extends LayoutShadowNode> getShadowNodeClass() {
        return ModalHostShadowNode.class;
    }

    @ReactProp(name = "visible")
    public void setVisible(PopModal view, boolean visible) {
       if(visible){
           if(!view.isShow()){
               view.showOrUpdate();
           }
       }else{
           if(view.isShow()){
               view.dismiss();
           }
       }
    }

    @Override
    public void onActivityCreate(Activity activity) {

    }

    @Override
    public void onStart(Activity activity) {

    }

    @Override
    public void onResume(Activity activity) {

    }

    @Override
    public void onPause(Activity activity) {

    }

    @Override
    public void onStop(Activity activity) {

    }

    @Override
    public void onDestroy(Activity activity) {
        PopModal.mContext = null;
    }

    @Override
    public void onDropViewInstance(PopModal view) {
        Log.i(TAG,"onDropViewInstance");
        super.onDropViewInstance(view);
        view.onDropInstance();
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.<String, Integer>builder()
                .put("show", show)
                .put("close",close)
                .build();
    }

    @Override
    public void receiveCommand(PopModal root, int commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        Log.i(TAG,args.getString(0));
        String key = args.getString(0);
        switch (commandId){
            case show:
                root.showOrUpdate();
                break;
            case close:
                root.dismiss();
                break;
        }
    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext, PopModal view) {
        super.addEventEmitters(reactContext, view);
        final EventDispatcher dispatcher =
                reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
    }

    @Override
    protected void onAfterUpdateTransaction(PopModal view) {
        super.onAfterUpdateTransaction(view);
//        view.showOrUpdate();
    }

}
