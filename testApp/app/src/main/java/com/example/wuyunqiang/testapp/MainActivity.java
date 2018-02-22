package com.example.wuyunqiang.testapp;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.ColorInt;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.PopupWindow;

import com.example.wuyunqiang.testapp.Utils.BarUtils;
import com.example.wuyunqiang.testapp.Utils.Utils;
import com.example.wuyunqiang.testapp.activity.TestActivity;
import com.example.wuyunqiang.testapp.preloadreact.ReactNativePreLoader;

import java.lang.reflect.Field;

public class MainActivity extends AppCompatActivity {

    private Dialog mDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        transparentStatusBar(this,Color.TRANSPARENT);

    }

    private static void transparentStatusBar(final Activity activity,@ColorInt int color) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT) return;
        Window window = activity.getWindow();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            int option = View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
            window.getDecorView().setSystemUiVisibility(option);
            window.setStatusBarColor(Color.TRANSPARENT);
        } else {
            window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        }
    }


    public void onClick(View view) {
        if(view.getId()==R.id.toTest){
            Intent it = new Intent(this,TestActivity.class);
            it.putExtra("name","wuyunqiang");
            startActivity(it);
            overridePendingTransition(R.anim.slide_in_right,R.anim.slide_out_right);
        }else if(view.getId()==R.id.showPop){
            this.showPopWindow();
        }else if(view.getId()==R.id.showDialog){

            mDialog = new Dialog(this,R.style.AppTheme);
            mDialog.setContentView(getContentView());
            mDialog.show();
            Utils.init(getApplication());
            BarUtils.setStatusBarColor(this, Color.BLUE);
            mDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.BLUE));
            mDialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        }
    }


    private View getContentView() {
        FrameLayout frameLayout = new FrameLayout(this);
        frameLayout.setBackgroundColor(Color.BLUE);
//        frameLayout.addView(mHostView);
//        frameLayout.setFitsSystemWindows(true);
        return frameLayout;
    }


    public void showPopWindow(){
        LinearLayout linearlayout = (LinearLayout) LayoutInflater.from(this).inflate(R.layout.share, null);
        final PopupWindow popupWindow = new PopupWindow(linearlayout, LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT, true);
        popupWindow.setTouchable(true);// true popwindow优先一切（系统级以外）处理touch  false:popwindow 只是一个view 不影响界面操作
        //  popupWindow.setOutsideTouchable(false);
        ColorDrawable dw = new ColorDrawable(this.getResources().getColor(R.color.colorPrimary));
        popupWindow.setBackgroundDrawable(dw);//不设置背景无法点击
        fitPopupWindowOverStatusBar(popupWindow,true);
        popupWindow.showAtLocation(linearlayout, Gravity.BOTTOM, 0, 0);//异步调用 popwindow依赖view oncreate时view并没有建立
    }


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


    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if(hasFocus) {
            ReactNativePreLoader.preLoad(MainActivity.this,"RNActivity");
            ReactNativePreLoader.preLoad(MainActivity.this,"TestActivity");

        }
    }
}
