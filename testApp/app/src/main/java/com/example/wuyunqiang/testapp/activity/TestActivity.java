package com.example.wuyunqiang.testapp.activity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;

import com.example.wuyunqiang.testapp.MyReactActivity;
import com.example.wuyunqiang.testapp.R;
import com.example.wuyunqiang.testapp.preloadreact.ReactNativePreLoader;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactRootView;

import javax.annotation.Nullable;

public class TestActivity extends ReactActivity {


    static final String TAG = "TestActivity";
    private ReactRootView mReactRootView;

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "TestActivity";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        LinearLayout root = new LinearLayout(this);//根视图
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.MATCH_PARENT);
        root.setLayoutParams(params);
        root.setBackgroundColor(Color.CYAN);
        root.setOrientation(LinearLayout.VERTICAL);

        //加载原生视图
        LinearLayout nativeroot = (LinearLayout) LayoutInflater.from(this).inflate(R.layout.activity_test,null);
        root.addView(nativeroot);

        //实例化rn视图
        mReactRootView = ReactNativePreLoader.getReactRootView("TestActivity");
        if(mReactRootView==null){
            mReactRootView = new ReactRootView(this);
            mReactRootView.startReactApplication(
                    getReactInstanceManager(),
                    "TestActivity",
                    null);
        }

        LinearLayout rnroot = new LinearLayout(this);
        rnroot.setLayoutParams(params);
        rnroot.addView(mReactRootView);
        rnroot.setOrientation(LinearLayout.VERTICAL);

        root.addView(rnroot);
        setContentView(root);
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        ReactNativePreLoader.deatchView("TestActivity");
        Log.i(TAG,"onDestroy");
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Log.i(TAG,"onBackPressed");
        this.finish();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_left);
    }

    public void onClick(View view) {
        if(view.getId()==R.id.roRN){
            Intent it = new Intent(this,MyReactActivity.class);
            it.putExtra("name","wuyunqiang");
            startActivity(it);
            overridePendingTransition(R.anim.slide_in_right,R.anim.slide_out_right);
        }
    }
}
