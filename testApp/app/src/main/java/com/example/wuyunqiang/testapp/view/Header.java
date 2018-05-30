package com.example.wuyunqiang.testapp.view;

import android.support.annotation.ColorInt;
import android.support.annotation.NonNull;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.GlideBuilder;
import com.example.wuyunqiang.testapp.R;
import com.facebook.react.bridge.ReactContext;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshKernel;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.constant.SpinnerStyle;
import com.scwang.smartrefresh.layout.internal.ProgressDrawable;
import com.scwang.smartrefresh.layout.internal.pathview.PathsView;
import com.scwang.smartrefresh.layout.util.DensityUtil;

/**
 * Created by wuyunqiang on 2018/1/17.
 */

public class Header extends LinearLayout implements RefreshHeader {
    static final String TAG = "HeaderLayout";
    ImageView pulling;
    ImageView pullrelease;
    ImageView pullok;
    LinearLayout header;
    private ReactContext reactContext;

    public Header(ReactContext context) {
        super(context);
        initView(context);
    }
    public Header(ReactContext context, AttributeSet attrs) {
        super(context, attrs);
        this.initView(context);
    }
    public Header(ReactContext context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.initView(context);
    }

    private void initView(ReactContext context) {
        this.reactContext = context;
        header = (LinearLayout) LayoutInflater.from(context).inflate(R.layout.header,null);
        pulling = header.findViewById(R.id.pulling);
        pullok = header.findViewById(R.id.pullok);
        pullrelease = header.findViewById(R.id.pullrelease);

//        Glide.with(context).load(R.mipmap.pullok).into(pullok);//本地图片

        Glide.with(context).asGif().load(R.mipmap.pulling).into(pulling);//本地gif图片
        Glide.with(context).asGif().load(R.mipmap.pullrelease).into(pullrelease);
        pullok.setImageResource(R.mipmap.pullok);

        LayoutParams params = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        params.gravity= Gravity.CENTER;
        this.addView(header,params);
        setMinimumHeight(DensityUtil.dp2px(60));
    }


    @NonNull
    public View getView() {
        return this;//真实的视图就是自己，不能返回null
    }


    @Override
    public SpinnerStyle getSpinnerStyle() {
        return SpinnerStyle.Translate;//指定为平移，不能null
    }
    @Override
    public void onStartAnimator(RefreshLayout layout, int headHeight, int extendHeight) {
//        this.mProgressDrawable.start();//开始动画
    }
    @Override
    public int onFinish(RefreshLayout layout, boolean success) {
        if (success){
            this.pulling.setVisibility(GONE);
            this.pullok.setVisibility(VISIBLE);
            this.pullrelease.setVisibility(GONE);
        } else {
//            this.mHeaderText.setText("刷新失败");
        }
        return 500;//延迟500毫秒之后再弹回
    }

    @Override
    public void onStateChanged(RefreshLayout refreshLayout, RefreshState oldState, RefreshState newState) {
        switch (newState) {
            case None:
            case PullDownToRefresh:
                Log.i(TAG,"PullDownToRefresh");
                this.pulling.setVisibility(VISIBLE);
                this.pullok.setVisibility(GONE);
                this.pullrelease.setVisibility(GONE);
                break;
            case Refreshing:
                Log.i(TAG,"Refreshing");
                this.pulling.setVisibility(VISIBLE);
                this.pullok.setVisibility(GONE);
                this.pullrelease.setVisibility(GONE);
                break;
            case ReleaseToRefresh:
                Log.i(TAG,"ReleaseToRefresh");
                this.pulling.setVisibility(VISIBLE);
                this.pullok.setVisibility(GONE);
                this.pullrelease.setVisibility(GONE);
                break;
        }
    }
    @Override
    public boolean isSupportHorizontalDrag() {
        return false;
    }
    @Override
    public void onInitialized(RefreshKernel kernel, int height, int extendHeight) {
    }
    @Override
    public void onHorizontalDrag(float percentX, int offsetX, int offsetMax) {
    }
    @Override
    public void onPullingDown(float percent, int offset, int headHeight, int extendHeight) {
        Log.i(TAG,"onPullingDown");
    }
    @Override
    public void onReleasing(float percent, int offset, int headHeight, int extendHeight) {
        Log.i(TAG,"onReleasing");
    }
    @Override
    public void onRefreshReleased(RefreshLayout layout, int headerHeight, int extendHeight) {
    }
    @Override
    public void setPrimaryColors(@ColorInt int ... colors){
    }


}
