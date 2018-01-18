package com.example.wuyunqiang.testapp.view;

import android.support.annotation.ColorInt;
import android.support.annotation.NonNull;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

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
    private TextView mHeaderText;//标题文本
    private PathsView mArrowView;//下拉箭头
    private ImageView mProgressView;//刷新动画视图
    private ProgressDrawable mProgressDrawable;//刷新动画

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
        setGravity(Gravity.CENTER);
        mHeaderText = new TextView(context);
        mHeaderText.setText("下拉开始刷新");
        mProgressDrawable = new ProgressDrawable();
        mArrowView = new PathsView(context);
        mProgressView = new ImageView(context);
        mProgressView.setImageDrawable(mProgressDrawable);
        mArrowView.parserPaths("M20,12l-1.41,-1.41L13,16.17V4h-2v12.17l-5.58,-5.59L4,12l8,8 8,-8z");
        addView(mProgressView, DensityUtil.dp2px(20), DensityUtil.dp2px(20));
        addView(mArrowView, DensityUtil.dp2px(20), DensityUtil.dp2px(20));
        addView(new View(context), DensityUtil.dp2px(20), DensityUtil.dp2px(20));
        addView(mHeaderText, LinearLayout.LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
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
        this.mProgressDrawable.start();//开始动画
    }
    @Override
    public int onFinish(RefreshLayout layout, boolean success) {
        this.mProgressDrawable.stop();//停止动画
        if (success){
            this.mHeaderText.setText("刷新完成");
        } else {
            this.mHeaderText.setText("刷新失败");
        }
        return 500;//延迟500毫秒之后再弹回
    }

    @Override
    public void onStateChanged(RefreshLayout refreshLayout, RefreshState oldState, RefreshState newState) {
        switch (newState) {
            case None:
            case PullDownToRefresh:
                this.mHeaderText.setText("下拉开始刷新");
                this.mArrowView.setVisibility(VISIBLE);//显示下拉箭头
                this.mProgressView.setVisibility(GONE);//隐藏动画
                this.mArrowView.animate().rotation(0);//还原箭头方向
                break;
            case Refreshing:
                this.mHeaderText.setText("正在刷新ing");
                this.mProgressView.setVisibility(VISIBLE);//显示加载动画
                this.mArrowView.setVisibility(GONE);//隐藏箭头
                break;
            case ReleaseToRefresh:
                this.mHeaderText.setText("释放立即刷新");
                this.mArrowView.animate().rotation(180);//显示箭头改为朝上
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
//        Log.i(TAG,"percent"+percent);
//        Log.i(TAG,"offset"+offset);
//        Log.i(TAG,"headHeight"+headHeight);
//        Log.i(TAG,"extendHeight"+extendHeight);
    }
    @Override
    public void onReleasing(float percent, int offset, int headHeight, int extendHeight) {
        Log.i(TAG,"onReleasing");
//        Log.i(TAG,"percent"+percent);
//        Log.i(TAG,"offset"+offset);
//        Log.i(TAG,"headHeight"+headHeight);
//        Log.i(TAG,"extendHeight"+extendHeight);
    }
    @Override
    public void onRefreshReleased(RefreshLayout layout, int headerHeight, int extendHeight) {

//        Log.i(TAG,"headHeight"+headerHeight);
//        Log.i(TAG,"extendHeight"+extendHeight);
    }
    @Override
    public void setPrimaryColors(@ColorInt int ... colors){
    }

    public void setmHeaderText(TextView mHeaderText) {
        this.mHeaderText = mHeaderText;
    }

    public void setmArrowView(PathsView mArrowView) {
        this.mArrowView = mArrowView;
    }

    public void setmProgressView(ImageView mProgressView) {
        this.mProgressView = mProgressView;
    }

    public void setmProgressDrawable(ProgressDrawable mProgressDrawable) {
        this.mProgressDrawable = mProgressDrawable;
    }

    public TextView getmHeaderText() {
        return mHeaderText;
    }

    public PathsView getmArrowView() {
        return mArrowView;
    }

    public ImageView getmProgressView() {
        return mProgressView;
    }

    public ProgressDrawable getmProgressDrawable() {
        return mProgressDrawable;
    }
}
