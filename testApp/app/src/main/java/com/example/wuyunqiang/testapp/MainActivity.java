package com.example.wuyunqiang.testapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.example.wuyunqiang.testapp.preloadreact.ReactNativePreLoader;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onClick(View view) {
        Intent it = new Intent(this,MyReactActivity.class);
        it.putExtra("name","wuyunqiang");
        startActivity(it);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if(hasFocus) {
            ReactNativePreLoader.preLoad(MainActivity.this,"RNActivity");
        }
    }
}
