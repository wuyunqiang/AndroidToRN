package com.example.wuyunqiang.testapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.example.wuyunqiang.testapp.activity.TestActivity;
import com.example.wuyunqiang.testapp.preloadreact.ReactNativePreLoader;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onClick(View view) {
        if(view.getId()==R.id.toTest){
            Intent it = new Intent(this,TestActivity.class);
            it.putExtra("name","wuyunqiang");
            startActivity(it);
            overridePendingTransition(R.anim.slide_in_right,R.anim.slide_out_right);
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
