package com.example.wuyunqiang.testapp.rnmodules;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.PopupWindow;

import com.example.wuyunqiang.testapp.R;
import com.example.wuyunqiang.testapp.Utils.BarUtils;
import com.example.wuyunqiang.testapp.Utils.Utils;
import com.example.wuyunqiang.testapp.activity.OtherActivity;
import com.example.wuyunqiang.testapp.activity.TestActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.lang.reflect.Field;

/**
 * Created by wuyunqiang on 2018/1/2.
 */

public class NativeUtil extends ReactContextBaseJavaModule {

    public static final String TAG = "StatusBar";
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

    @ReactMethod
    public void StatusBar(final Promise promise) {
        final Activity activity = getCurrentActivity();
        if(activity!=null){
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Utils.init(activity.getApplication());
                    BarUtils.setStatusBarAlpha(activity, 0);
                    int height = BarUtils.getStatusBarHeight();
                    Log.i(TAG,height+"");
                }
            });

        }
    }

    @ReactMethod
    public void StatusBarHeigh(final Promise promise) {
        final Activity activity = getCurrentActivity();
        WritableMap params = Arguments.createMap();
        if(activity!=null){
            Utils.init(activity.getApplication());
            int height = BarUtils.getStatusBarHeight();
            params.putInt("StatusBarHeight",height);
            promise.resolve(params);
        }else{
            params.putInt("StatusBarHeight",0);
            promise.resolve(params);
        }
    }

    //设置弹出框内容
    public void setContent(final PopupWindow popupWindow,Activity activity,final Promise promise){
        final WritableMap params = Arguments.createMap();
        LinearLayout linearlayout = (LinearLayout) LayoutInflater.from(activity).inflate(R.layout.share, null);
        View v = linearlayout.findViewById(R.id.background);
        v.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i(TAG,"点击空白区域");
                //popwindow 消失了
                popupWindow.dismiss();
            }
        });
        LinearLayout wechat = linearlayout.findViewById(R.id.wechat);
        wechat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                params.putInt("wechat",1);
                promise.resolve(params);
                popupWindow.dismiss();
            }
        });

        LinearLayout moment = linearlayout.findViewById(R.id.moment);
        moment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                params.putInt("wechat",2);
                promise.resolve(params);
                popupWindow.dismiss();
            }
        });
        View c = linearlayout.findViewById(R.id.cancel);
        c.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //popwindow 消失了
                popupWindow.dismiss();
            }
        });

        //  popupWindow.setOutsideTouchable(false);
        popupWindow.setContentView(linearlayout);
    }

    public void showPopWindow(Activity activity,final Promise promise){
        ColorDrawable dw = new ColorDrawable(activity.getResources().getColor(R.color.colorPrimaryDark));
        LinearLayout parent = new LinearLayout(activity);
        final PopupWindow popupWindow = new PopupWindow(parent, LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT, true);
        popupWindow.setTouchable(true);// true popwindow优先一切（系统级以外）处理touch  false:popwindow 只是一个view 不影响界面操作
//        popupWindow.setTouchInterceptor(new View.OnTouchListener() {//并没有什么用
//            @Override
//            public boolean onTouch(View v, MotionEvent event) {
//                Log.i(TAG, "onTouch ");
//                return false;
//            }
//        });

        this.setContent(popupWindow,activity,promise);
        popupWindow.setBackgroundDrawable(dw);//不设置背景无法点击
        fitPopupWindowOverStatusBar(popupWindow,true);
        popupWindow.showAtLocation(parent, Gravity.BOTTOM, 0, 0);//异步调用 popwindow依赖view oncreate时view并没有建立
    }


    //适配全屏
    public void fitPopupWindowOverStatusBar(PopupWindow popupWindow,boolean needFullScreen) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try {
                Field mLayoutInScreen = PopupWindow.class.getDeclaredField("mLayoutInScreen");
                mLayoutInScreen.setAccessible(true);
                mLayoutInScreen.set(popupWindow, needFullScreen);
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }


    @ReactMethod
    public void showDialog(final Promise promise) {
        final Activity activity = getCurrentActivity();
        if(activity!=null){
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    NativeUtil.this.showPopWindow(activity,promise);
                }
            });


        }
    }

}
